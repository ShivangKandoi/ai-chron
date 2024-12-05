import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                AI Chron
              </span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to="/editor" 
                className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Editor
              </Link>
              <Link 
                to="/design" 
                className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Design
              </Link>
              <Link 
                to="/about" 
                className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-300">
                  Welcome, <span className="font-medium text-primary-400">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-primary-400 hover:bg-primary-500 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-primary-400 hover:bg-primary-500 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 