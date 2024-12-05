import { useState, useEffect } from 'react';
import { FolderIcon, DocumentIcon } from '@heroicons/react/outline';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

export default function FileExplorer() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchFiles();
  }, [token, navigate]);

  const fetchFiles = async () => {
    try {
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/files`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (error: any) {
      console.error('Error fetching files:', error);
      setError(error.message || 'Failed to load files');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const renderTree = (nodes: FileNode[] = []) => ( // Provide default empty array
    <ul className="space-y-1">
      {nodes.map((node) => (
        <li key={node.id} className="px-2">
          <div
            className={`flex items-center space-x-2 p-1 rounded cursor-pointer hover:bg-gray-700 ${
              selectedFile === node.id ? 'bg-gray-700' : ''
            }`}
            onClick={() => setSelectedFile(node.id)}
          >
            {node.type === 'folder' ? (
              <FolderIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <DocumentIcon className="h-5 w-5 text-blue-400" />
            )}
            <span className="text-gray-200">{node.name}</span>
          </div>
          {node.children && renderTree(node.children)}
        </li>
      ))}
    </ul>
  );

  if (loading) {
    return (
      <div className="h-full p-4 text-sm text-gray-400">
        Loading files...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full p-4 text-sm text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="h-full p-4 text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold">Files</h2>
        <button className="text-gray-300 hover:text-white">
          + New
        </button>
      </div>
      {renderTree(files)}
    </div>
  );
} 