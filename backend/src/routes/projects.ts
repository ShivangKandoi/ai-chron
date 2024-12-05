import express from 'express';
import { Project } from '../models/Project';
import { authenticate } from '../middleware/auth';
import fs from 'fs-extra';
import path from 'path';

const router = express.Router();

// Create new project
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, files } = req.body;
    const userId = req.user.id;

    const projectPath = path.join(process.env.PROJECTS_DIR!, name);
    
    // Create project directory
    await fs.ensureDir(projectPath);

    // Create files and folders
    for (const file of files) {
      const filePath = path.join(projectPath, file.name);
      if (file.type === 'folder') {
        await fs.ensureDir(filePath);
        if (file.children) {
          for (const child of file.children) {
            const childPath = path.join(filePath, child.name);
            if (child.type === 'file') {
              await fs.writeFile(childPath, child.content || '');
            }
          }
        }
      } else {
        await fs.writeFile(filePath, file.content || '');
      }
    }

    const project = new Project({
      name,
      userId,
      path: projectPath,
      lastOpened: new Date()
    });

    await project.save();

    res.status(201).json({
      id: project._id,
      name: project.name,
      path: project.path,
      lastOpened: project.lastOpened,
      files
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Get project files
router.get('/:id/files', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const files = await fs.readdir(project.path, { withFileTypes: true });
    const fileTree = await Promise.all(files.map(async (file) => {
      const filePath = path.join(project.path, file.name);
      if (file.isDirectory()) {
        const children = await fs.readdir(filePath);
        return {
          name: file.name,
          type: 'folder',
          children: children.map(child => ({
            name: child,
            type: fs.statSync(path.join(filePath, child)).isDirectory() ? 'folder' : 'file'
          }))
        };
      }
      return {
        name: file.name,
        type: 'file',
        content: await fs.readFile(filePath, 'utf-8')
      };
    }));

    res.json(fileTree);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get project files' });
  }
});

// Create file
router.post('/:id/files', authenticate, async (req, res) => {
  try {
    const { path: filePath, content = '' } = req.body;
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Create the full path
    const fullPath = path.join(project.path, ...filePath);
    
    // Ensure the directory exists
    await fs.ensureDir(path.dirname(fullPath));
    
    // Create the file
    await fs.writeFile(fullPath, content);

    // Read and return the updated file structure
    const updatedFiles = await getProjectFiles(project.path);
    res.json(updatedFiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create file' });
  }
});

// Create folder
router.post('/:id/folders', authenticate, async (req, res) => {
  try {
    const { path: folderPath } = req.body;
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Create the full path
    const fullPath = path.join(project.path, ...folderPath);
    
    // Create the directory
    await fs.ensureDir(fullPath);

    // Read and return the updated file structure
    const updatedFiles = await getProjectFiles(project.path);
    res.json(updatedFiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create folder' });
  }
});

// Helper function to get project files
async function getProjectFiles(projectPath: string): Promise<FileExplorerItem[]> {
  const items = await fs.readdir(projectPath, { withFileTypes: true });
  
  const filePromises = items.map(async (item) => {
    const itemPath = path.join(projectPath, item.name);
    
    if (item.isDirectory()) {
      const children = await getProjectFiles(itemPath);
      return {
        name: item.name,
        type: 'folder' as const,
        children,
        isOpen: false
      };
    }
    
    return {
      name: item.name,
      type: 'file' as const,
      content: await fs.readFile(itemPath, 'utf-8')
    };
  });

  return Promise.all(filePromises);
}

// Delete file or folder
router.delete('/:id/files', authenticate, async (req, res) => {
  try {
    const { path: itemPath } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const fullPath = path.join(project.path, ...itemPath);
    await fs.remove(fullPath);

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Add route to update last opened timestamp
router.post('/:id/open', authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    project.lastOpened = new Date();
    await project.save();

    res.json({ message: 'Project opened successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Get all projects
router.get('/', authenticate, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort({ lastOpened: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get projects' });
  }
});

// Delete project
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete project directory
    await fs.remove(project.path);
    // Delete project from database
    await Project.deleteOne({ _id: req.params.id });

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Open project
router.get('/:id', authenticate, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update last opened timestamp
    project.lastOpened = new Date();
    await project.save();

    // Get project files
    const files = await getProjectFiles(project.path);
    res.json({ project, files });
  } catch (err) {
    res.status(500).json({ error: 'Failed to open project' });
  }
});

export default router; 