import { useState, useEffect, useCallback, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import socketIO from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { getLanguageInfo } from '../utils/fileUtils';

// Import icons individually to avoid conflicts
import FolderIcon from '@heroicons/react/outline/FolderIcon';
import DocumentIcon from '@heroicons/react/outline/DocumentIcon';
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon';
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon';
import ChatAlt2Icon from '@heroicons/react/outline/ChatAlt2Icon';
import TerminalIcon from '@heroicons/react/outline/TerminalIcon';
import PlusIcon from '@heroicons/react/outline/PlusIcon';
import TrashIcon from '@heroicons/react/outline/TrashIcon';
import FolderAddIcon from '@heroicons/react/outline/FolderAddIcon';
import DocumentAddIcon from '@heroicons/react/outline/DocumentAddIcon';
import CogIcon from '@heroicons/react/outline/CogIcon';
import XIcon from '@heroicons/react/outline/XIcon';
import PlayIcon from '@heroicons/react/outline/PlayIcon';
import SaveIcon from '@heroicons/react/outline/SaveIcon';
import ChatAltIcon from '@heroicons/react/outline/ChatAltIcon';
import FolderOpenIcon from '@heroicons/react/outline/FolderOpenIcon';
import BookOpenIcon from '@heroicons/react/outline/BookOpenIcon';
import AcademicCapIcon from '@heroicons/react/outline/AcademicCapIcon';
import SparklesIcon from '@heroicons/react/outline/SparklesIcon';
import LocationMarkerIcon from '@heroicons/react/outline/LocationMarkerIcon';
import HandIcon from '@heroicons/react/outline/HandIcon';
import KeyIcon from '@heroicons/react/outline/KeyIcon';
import DatabaseIcon from '@heroicons/react/outline/DatabaseIcon';
import ServerIcon from '@heroicons/react/outline/ServerIcon';

interface Project {
  id: string;
  name: string;
  path: string;
  lastOpened: Date;
}

interface FileExplorerItem {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileExplorerItem[];
  isOpen?: boolean;
}

interface CodeOutput {
  output: string;
  error?: string;
}

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface EditorProps {
  defaultLanguage?: string;
  defaultTheme?: string;
}

export default function CodeEditor({ defaultLanguage = 'javascript', defaultTheme = 'vs-dark' }: EditorProps) {
  const { isAuthenticated } = useAuth();
  
  // State management
  const [code, setCode] = useState<string>('// Start coding here...');
  const [output, setOutput] = useState<string>('');
  const [socket, setSocket] = useState<ReturnType<typeof socketIO> | null>(null);
  const [language, setLanguage] = useState(defaultLanguage);
  const [theme, setTheme] = useState(defaultTheme);
  const [isRunning, setIsRunning] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasProject, setHasProject] = useState(false);
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [currentFileInfo, setCurrentFileInfo] = useState<{ name: string; language: string; icon: string; color: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize files with some example content
  const [files, setFiles] = useState<FileExplorerItem[]>([
    {
      name: 'src',
      type: 'folder',
      isOpen: true,
      children: [
        { 
          name: 'index.js',
          type: 'file',
          content: '// Main entry point\nconsole.log("Hello, World!");'
        },
        { 
          name: 'styles.css',
          type: 'file',
          content: '/* Styles */\nbody { margin: 0; padding: 0; }'
        },
        {
          name: 'components',
          type: 'folder',
          children: [
            { 
              name: 'App.js',
              type: 'file',
              content: 'function App() {\n  return <div>Hello World</div>;\n}'
            },
            { 
              name: 'Header.js',
              type: 'file',
              content: 'function Header() {\n  return <header>Header</header>;\n}'
            },
          ],
        },
      ],
    },
  ]);

  // Socket connection
  useEffect(() => {
    const newSocket = socketIO(import.meta.env.VITE_WS_URL || 'ws://localhost:3000');
    
    newSocket.on('connect', () => {
      setIsConnected(true);
      setOutput('Connected to server\n');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      setOutput(prev => prev + 'Disconnected from server\n');
    });

    newSocket.on('codeOutput', (data: CodeOutput) => {
      setIsRunning(false);
      if (data.error) {
        setOutput(prev => prev + `Error: ${data.error}\n`);
      } else {
        setOutput(prev => prev + `${data.output}\n`);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // File Explorer Functions
  const toggleFolder = (path: string[]) => {
    const updateFiles = (items: FileExplorerItem[], currentPath: string[]): FileExplorerItem[] => {
      return items.map(item => {
        if (item.name === currentPath[0]) {
          if (currentPath.length === 1) {
            return { ...item, isOpen: !item.isOpen };
          }
          return {
            ...item,
            children: item.children ? updateFiles(item.children, currentPath.slice(1)) : undefined,
          };
        }
        return item;
      });
    };
    setFiles(updateFiles(files, path));
  };

  const findFileContent = (path: string[], items: FileExplorerItem[]): string | null => {
    for (const item of items) {
      if (item.name === path[0]) {
        if (path.length === 1 && item.type === 'file') {
          return item.content || '';
        }
        if (item.children) {
          const result = findFileContent(path.slice(1), item.children);
          if (result !== null) return result;
        }
      }
    }
    return null;
  };

  const updateFileContent = (path: string[], content: string) => {
    const updateFiles = (items: FileExplorerItem[], currentPath: string[]): FileExplorerItem[] => {
      return items.map(item => {
        if (item.name === currentPath[0]) {
          if (currentPath.length === 1 && item.type === 'file') {
            return { ...item, content };
          }
          return {
            ...item,
            children: item.children ? updateFiles(item.children, currentPath.slice(1)) : undefined,
          };
        }
        return item;
      });
    };
    setFiles(updateFiles(files, path));
  };

  // File Operations
  const handleFileClick = async (path: string[]) => {
    const fileName = path[path.length - 1];
    const languageInfo = getLanguageInfo(fileName);
    
    const content = findFileContent(path, files);
    if (content !== null) {
      setCode(content);
      setCurrentFile(path.join('/'));
      setLanguage(languageInfo.language);
      setCurrentFileInfo({
        name: fileName,
        ...languageInfo
      });
    }
  };

  const handleSaveFile = () => {
    if (currentFile) {
      updateFileContent(currentFile.split('/'), code);
      setOutput(prev => prev + `File saved: ${currentFile}\n`);
    }
  };

  // Code Execution
  const handleRunCode = async () => {
    if (!socket || !isConnected) {
      setError('Not connected to server');
      return;
    }

    setIsRunning(true);
    setOutput(prev => prev + '\n--- Running Code ---\n');

    try {
      socket.emit('runCode', { code, language });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsRunning(false);
    }
  };

  // AI Chat Functions
  const handleAIChat = async (message: string) => {
    try {
      setIsSendingMessage(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: `Language: ${language || 'javascript'}\nCode Context: ${code || ''}\nQuestion: ${message}\nContext: ${selectedProject ? `Project: ${selectedProject.name}` : ''}`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('AI response error:', errorData);
        throw new Error(errorData.details || `Failed to get AI response: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.response) {
        throw new Error('Invalid response format from AI service');
      }

      return data.response;
    } catch (err) {
      console.error('AI Chat Error:', err);
      throw err;
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isSendingMessage) return;

    const newMessage = {
      role: 'user' as const,
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');

    try {
      const aiResponse = await handleAIChat(chatInput);
      
      setChatMessages(prev => [...prev, {
        role: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      setChatMessages(prev => [...prev, {
        role: 'ai',
        content: `Error: ${errorMessage}. Please try again.`,
        timestamp: new Date()
      }]);
    }
  };

  // Project Management Functions
  const createNewProject = async (name: string) => {
    if (!name.trim()) {
      setError('Project name cannot be empty');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          name,
          files: [
            {
              name: 'src',
              type: 'folder',
              children: [
                {
                  name: 'index.js',
                  type: 'file',
                  content: '// Welcome to your new project!\nconsole.log("Hello, World!");'
                }
              ]
            },
            {
              name: 'package.json',
              type: 'file',
              content: JSON.stringify({
                name: name.toLowerCase().replace(/\s+/g, '-'),
                version: '1.0.0',
                description: 'A new project created with AI Chron',
                main: 'src/index.js',
                scripts: {
                  start: 'node src/index.js'
                }
              }, null, 2)
            }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      const project = await response.json();
      setProjects(prev => [...prev, project]);
      setSelectedProject(project);
      setFiles(project.files);
      setShowProjectModal(false);
      setHasProject(true);
      setOutput(prev => `${prev}\nProject "${name}" created successfully!\n`);

      // Load the project files immediately after creation
      await loadProjectFiles(project.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjectFiles = async (projectId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}/files`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to load project files');
      }
      
      const projectFiles = await response.json();
      setFiles(projectFiles);
      setHasProject(true);
      setShowProjectModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project files');
    }
  };

  const openProject = async (project: Project) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${project.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to open project');
      }

      const data = await response.json();
      setSelectedProject(data.project);
      setFiles(data.files);
      setHasProject(true);
      setShowProjectModal(false);
      setOutput(prev => `${prev}\nOpened project: ${project.name}\n`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open project');
    }
  };

  // Define loadProjects before using it
  const loadProjects = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load projects');
      }

      const projectsList = await response.json();
      setProjects(projectsList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    }
  }, [setError]); // Added setError to dependencies

  // Use loadProjects in useEffect
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const deleteProject = useCallback(async (projectId: string) => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      await loadProjects();
      setOutput(prev => `${prev}\nProject deleted successfully\n`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    } finally {
      setIsDeleting(false);
    }
  }, [loadProjects, setError, setOutput]);

  // File System Operations
  const createFile = async (path: string[], name: string) => {
    if (!name.trim()) {
      setError('File name cannot be empty');
      return;
    }

    try {
      if (!selectedProject) {
        throw new Error('No project selected');
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${selectedProject.id}/files`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          path: [...path, name],
          type: 'file',
          content: ''
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create file');
      }

      const updatedFiles = await response.json();
      setFiles(updatedFiles);
      setIsCreatingFile(false);
      setNewItemName('');
      setOutput(prev => `${prev}\nCreated file: ${name}\n`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create file');
    }
  };

  const createFolder = async (path: string[], name: string) => {
    if (!name.trim()) {
      setError('Folder name cannot be empty');
      return;
    }

    try {
      if (!selectedProject) {
        throw new Error('No project selected');
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${selectedProject.id}/folders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          path: [...path, name]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create folder');
      }

      const updatedFiles = await response.json();
      setFiles(updatedFiles);
      setIsCreatingFolder(false);
      setNewItemName('');
      setOutput(prev => `${prev}\nCreated folder: ${name}\n`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create folder');
    }
  };

  const deleteItem = async (path: string[]) => {
    try {
      if (!selectedProject) return;
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${selectedProject.id}/files`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ path })
      });

      if (!response.ok) throw new Error('Failed to delete item');
      
      const updatedFiles = await response.json();
      setFiles(updatedFiles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  // Terminal Enhancement
  const handleTerminalInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = terminalInput.trim();
      setOutput(prev => `${prev}\n$ ${command}`);
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/terminal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            command,
            projectId: selectedProject?.id,
            cwd: currentPath.join('/')
          })
        });

        const result = await response.json();
        setOutput(prev => `${prev}\n${result.output}`);
      } catch (err) {
        setOutput(prev => `${prev}\nError: Failed to execute command`);
      }

      setTerminalInput('');
      terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    }
  };

  const handleCreateProject = () => {
    setIsCreatingNewProject(true);
    setShowProjectModal(true);
  };

  const handleOpenProject = () => {
    setIsCreatingNewProject(false);
    setShowProjectModal(true);
  };

  // Welcome Screen Component
  const WelcomeScreen = () => (
    <div className="flex flex-col h-screen">
      <div className="h-16" /> {/* Navbar spacer */}
      <div className="flex-1 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 animate-gradient" />
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/30 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse delay-700" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <CogIcon className="h-20 w-20 text-white relative z-10 transform hover:rotate-180 transition-transform duration-1000" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400 mb-4">
              Welcome to AI Chron Editor
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your intelligent coding environment powered by AI
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <button
              onClick={handleCreateProject}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg overflow-hidden shadow-lg hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative flex items-center justify-center">
                <FolderAddIcon className="h-6 w-6 mr-3" />
                <span className="text-lg font-semibold">Create New Project</span>
              </div>
            </button>
            <button
              onClick={handleOpenProject}
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-gray-700/25 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative flex items-center justify-center">
                <FolderOpenIcon className="h-6 w-6 mr-3" />
                <span className="text-lg font-semibold">Open Existing Project</span>
              </div>
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                id: 'ai-assistant',
                icon: ChatAltIcon,
                title: 'AI Assistant',
                description: 'Get intelligent code suggestions and real-time help from our AI assistant.',
                gradient: 'from-blue-500 to-indigo-500'
              },
              {
                id: 'smart-editor',
                icon: DocumentAddIcon,
                title: 'Smart Editor',
                description: 'Feature-rich code editor with syntax highlighting and intelligent completions.',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                id: 'terminal',
                icon: TerminalIcon,
                title: 'Integrated Terminal',
                description: 'Built-in terminal for running commands and managing your project.',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                id: 'project-management',
                icon: FolderAddIcon,
                title: 'Project Management',
                description: 'Organize your projects with an intuitive file explorer.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                id: 'quick-execution',
                icon: PlayIcon,
                title: 'Quick Execution',
                description: 'Run your code instantly and see the results in real-time.',
                gradient: 'from-yellow-500 to-orange-500'
              },
              {
                id: 'auto-save',
                icon: SaveIcon,
                title: 'Auto-Save',
                description: 'Never lose your work with automatic file saving.',
                gradient: 'from-cyan-500 to-blue-500'
              }
            ].map((feature) => (
              <div
                key={feature.id}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/75 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${parseInt(feature.id) * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-6 text-center">Quick Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'tip-1', shortcut: '⌘ + Space', description: 'Trigger AI suggestions' },
                { id: 'tip-2', shortcut: '⌘ + S', description: 'Save current file' },
                { id: 'tip-3', shortcut: '⌘ + B', description: 'Toggle file explorer' },
                { id: 'tip-4', shortcut: '⌘ + J', description: 'Toggle terminal' },
                { id: 'tip-5', shortcut: '⌘ + P', description: 'Quick file search' },
                { id: 'tip-6', shortcut: '⌘ + K', description: 'Command palette' },
              ].map((tip) => (
                <div key={tip.id} className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-auto px-3 rounded bg-primary-500/20 text-primary-400 font-mono text-sm">
                      {tip.shortcut}
                    </span>
                  </div>
                  <span className="text-gray-300">{tip.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Project Modal with enhanced styling
  const ProjectModal = () => {
    const quickTips = [
      { id: 'tip-1', shortcut: '⌘ + Space', description: 'Trigger AI suggestions' },
      { id: 'tip-2', shortcut: '⌘ + S', description: 'Save current file' },
      { id: 'tip-3', shortcut: '⌘ + B', description: 'Toggle file explorer' },
      { id: 'tip-4', shortcut: '⌘ + J', description: 'Toggle terminal' },
      { id: 'tip-5', shortcut: '⌘ + P', description: 'Quick file search' },
      { id: 'tip-6', shortcut: '⌘ + K', description: 'Command palette' },
    ];

    const renderProjectList = () => {
      if (projects.length === 0) {
        return (
          <div className="text-center py-12">
            <DocumentIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-500">No projects yet</p>
            <button
              onClick={() => setIsCreatingNewProject(true)}
              className="mt-4 text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Create your first project
            </button>
          </div>
        );
      }

      return projects.map((project) => (
        <div
          key={project.id}
          className="group relative bg-gray-700 hover:bg-gray-600 rounded-lg p-4 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div
              className="flex-1 cursor-pointer"
              onClick={() => openProject(project)}
            >
              <h4 className="text-white font-medium mb-1">{project.name}</h4>
              <p className="text-sm text-gray-400">{project.path}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                {new Date(project.lastOpened).toLocaleDateString()}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(project.id);
                }}
                disabled={isDeleting}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-500 rounded transition-all duration-200"
              >
                <TrashIcon className="h-4 w-4 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      ));
    };

    return (
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-6 w-[32rem] shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isCreatingNewProject ? 'Create New Project' : 'Open Project'}
            </h2>
            <button
              onClick={() => setShowProjectModal(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          {isCreatingNewProject ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  placeholder="Enter project name..."
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-300"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && createNewProject(newItemName)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {quickTips.map((tip) => (
                  <div key={tip.id} className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-sm font-medium text-primary-400">{tip.shortcut}</div>
                    <div className="text-xs text-gray-400">{tip.description}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => createNewProject(newItemName)}
                disabled={isLoading}
                className={`w-full ${
                  isLoading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
                } text-white rounded-lg px-4 py-3 flex items-center justify-center transition-all duration-300`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Project...
                  </>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-400">Recent Projects</h3>
                <button
                  onClick={() => setIsCreatingNewProject(true)}
                  className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                >
                  Create New
                </button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {renderProjectList()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Add back the renderFileExplorer function
  const renderFileExplorer = (items: FileExplorerItem[], path: string[] = []) => (
    <div className="space-y-1">
      <div className="flex space-x-2 mb-2 px-2">
        <button
          onClick={() => {
            setIsCreatingFile(true);
            setIsCreatingFolder(false);
            setCurrentPath(path);
            setNewItemName('');
          }}
          className="p-1 hover:bg-gray-700 rounded group relative"
          title="New File"
        >
          <DocumentAddIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-400" />
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
            New File
          </span>
        </button>
        <button
          onClick={() => {
            setIsCreatingFolder(true);
            setIsCreatingFile(false);
            setCurrentPath(path);
            setNewItemName('');
          }}
          className="p-1 hover:bg-gray-700 rounded group relative"
          title="New Folder"
        >
          <FolderAddIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-400" />
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
            New Folder
          </span>
        </button>
      </div>
      
      {(isCreatingFile || isCreatingFolder) && JSON.stringify(path) === JSON.stringify(currentPath) && (
        <div className="px-2 py-1">
          <input
            type="text"
            autoFocus
            className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            placeholder={isCreatingFile ? "File name..." : "Folder name..."}
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (isCreatingFile) {
                  createFile(path, newItemName);
                } else {
                  createFolder(path, newItemName);
                }
              }
            }}
            onBlur={() => {
              // Only clear if we click outside and haven't submitted
              if (!newItemName) {
                setIsCreatingFile(false);
                setIsCreatingFolder(false);
                setNewItemName('');
              }
            }}
          />
        </div>
      )}

      {items.map((item) => (
        <div key={item.name}>
          <div className="group flex items-center px-2 py-1 text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
            <div 
              className="flex-1 flex items-center" 
              onClick={() => item.type === 'folder' ? toggleFolder([...path, item.name]) : handleFileClick([...path, item.name])}
            >
              <div className="w-4 h-4 mr-1">
                {item.type === 'folder' && (
                  item.isOpen ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />
                )}
              </div>
              {item.type === 'folder' ? (
                <FolderIcon className="w-4 h-4 mr-2 text-yellow-400" />
              ) : (
                <img 
                  src={getLanguageInfo(item.name).icon} 
                  alt=""
                  className="w-4 h-4 mr-2"
                  style={{ filter: `drop-shadow(0 0 2px ${getLanguageInfo(item.name).color})` }}
                />
              )}
              <span className="text-sm">{item.name}</span>
            </div>
            <button
              onClick={() => deleteItem([...path, item.name])}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded"
            >
              <TrashIcon className="w-4 h-4 text-red-400" />
            </button>
          </div>
          {item.type === 'folder' && item.isOpen && item.children && (
            <div className="ml-4">
              {renderFileExplorer(item.children, [...path, item.name])}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Define renderAIChat as a component
  const AIChatPanel = () => (
    <div className={`w-80 bg-gray-800 border-l border-gray-700 flex flex-col overflow-hidden ${showChat ? '' : 'hidden'}`}>
      <div className="h-10 px-4 border-b border-gray-700 font-semibold flex items-center justify-between">
        <div className="flex items-center">
          <ChatAlt2Icon className="w-5 h-5 mr-2 text-primary-400" />
          <span>AI Assistant</span>
        </div>
        <button
          onClick={() => setShowChat(!showChat)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              <pre className="whitespace-pre-wrap break-words font-sans">
                {message.content}
              </pre>
              <div className="text-xs text-gray-400 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            ref={chatInputRef}
            type="text"
            value={chatInput}
            onChange={(e) => {
              e.preventDefault();
              setChatInput(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isSendingMessage) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask AI for help..."
            className="flex-1 bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isSendingMessage}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            disabled={isSendingMessage}
            className={`px-4 py-2 ${
              isSendingMessage 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-primary-500 hover:bg-primary-600'
            } text-white rounded transition-colors flex items-center`}
          >
            {isSendingMessage ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Render welcome screen if no project is open
  if (!hasProject) {
    return (
      <>
        <WelcomeScreen />
        {showProjectModal && <ProjectModal />}
      </>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="h-16"> {/* Spacer for navbar */}</div>
      <div className="flex-1 flex bg-gray-900 text-white overflow-hidden">
        {/* File Explorer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
          <div className="p-2 border-b border-gray-700 font-semibold flex items-center">
            <FolderIcon className="w-5 h-5 mr-2" />
            Explorer
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {renderFileExplorer(files)}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Toolbar */}
          <div className="h-10 bg-gray-800 border-b border-gray-700 px-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {currentFileInfo && (
                <div className="flex items-center space-x-2">
                  <img 
                    src={currentFileInfo.icon} 
                    alt=""
                    className="w-5 h-5"
                    style={{ filter: `drop-shadow(0 0 2px ${currentFileInfo.color})` }}
                  />
                  <span className="text-sm text-gray-300">{currentFileInfo.name}</span>
                </div>
              )}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center text-sm"
              >
                <PlayIcon className="w-4 h-4 mr-1" />
                Run
              </button>
              <button
                onClick={handleSaveFile}
                disabled={!currentFile}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center text-sm"
              >
                <SaveIcon className="w-4 h-4 mr-1" />
                Save
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                {currentFile || 'No file selected'}
              </span>
              <button
                onClick={() => setShowTerminal(!showTerminal)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <TerminalIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editor and Terminal */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className={`flex-1 ${showTerminal ? '' : 'h-full'} overflow-hidden`}>
              <MonacoEditor
                height="100%"
                language={language}
                theme={theme}
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                }}
              />
            </div>
            {showTerminal && (
              <div className="h-40 bg-gray-800 border-t border-gray-700 flex flex-col overflow-hidden">
                <div className="h-8 flex items-center justify-between px-2 bg-gray-900 border-b border-gray-700">
                  <div className="flex items-center">
                    <TerminalIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">Terminal</span>
                  </div>
                  <button
                    onClick={() => setShowTerminal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
                <div ref={terminalRef} className="flex-1 p-2 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
                  {output}
                  <div className="flex items-center">
                    <span className="text-green-400">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyPress={handleTerminalInput}
                      className="flex-1 bg-transparent border-none outline-none text-white ml-2"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Chat Panel */}
        <AIChatPanel />
      </div>

      {/* Project Modal */}
      {showProjectModal && <ProjectModal />}
    </div>
  );
} 