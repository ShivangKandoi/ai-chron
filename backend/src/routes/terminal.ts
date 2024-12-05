import express from 'express';
import { authenticate } from '../middleware/auth';
import { exec } from 'child_process';
import { Project } from '../models/Project';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  try {
    const { command, projectId, cwd } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    exec(command, { cwd: cwd || project.path }, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: stderr });
      }
      res.json({ output: stdout });
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to execute command' });
  }
});

export default router; 