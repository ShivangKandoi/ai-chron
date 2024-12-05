import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon';
import CodeIcon from '@heroicons/react/outline/CodeIcon';
import SparklesIcon from '@heroicons/react/outline/SparklesIcon';
import CloudIcon from '@heroicons/react/outline/CloudIcon';
import LightningBoltIcon from '@heroicons/react/outline/LightningBoltIcon';
import UserGroupIcon from '@heroicons/react/outline/UserGroupIcon';
import ShieldCheckIcon from '@heroicons/react/outline/ShieldCheckIcon';
import Footer from '../components/Footer';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 animate-gradient" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse delay-700" />
          
          {/* Code Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute transform -rotate-12 left-1/4 top-1/4">
              <CodeIcon className="w-24 h-24 text-primary-400" />
            </div>
            <div className="absolute transform rotate-12 right-1/4 bottom-1/4">
              <SparklesIcon className="w-24 h-24 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-16">
            {/* Main Heading */}
            <div className="space-y-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
                <span className="block text-white mb-4">Welcome to</span>
                <span className="block bg-gradient-to-r from-primary-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Chron
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-300 leading-relaxed">
                The next generation AI-powered development environment. 
                Write better code, faster and smarter.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center space-x-6">
              {isAuthenticated ? (
                <Link
                  to="/editor"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-black bg-primary-400 hover:bg-primary-500 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
                >
                  Open Editor
                  <ChevronRightIcon className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-black bg-primary-400 hover:bg-primary-500 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
                >
                  Get Started
                  <ChevronRightIcon className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-colors">
                <SparklesIcon className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
                <p className="text-gray-400">Intelligent code suggestions and real-time assistance</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-colors">
                <CodeIcon className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Smart Editor</h3>
                <p className="text-gray-400">Advanced code editing with intelligent features</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-colors">
                <ChevronRightIcon className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Fast Development</h3>
                <p className="text-gray-400">Speed up your development workflow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="min-h-screen flex items-center justify-center bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-20">
            <h2 className="text-base text-primary-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-4xl font-extrabold text-white">
              Supercharge Your Development
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Everything you need to write better code, faster and smarter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
              <SparklesIcon className="h-12 w-12 text-primary-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">AI-Powered Assistance</h3>
              <p className="text-gray-300">Get intelligent suggestions and real-time help while you code.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
              <CloudIcon className="h-12 w-12 text-primary-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Cloud Integration</h3>
              <p className="text-gray-300">Seamlessly sync your projects across devices and collaborate.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
              <LightningBoltIcon className="h-12 w-12 text-primary-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-300">Experience blazing fast performance and instant responses.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-20">
            <h2 className="text-base text-primary-400 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-4xl font-extrabold text-white">
              Simple and Powerful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg blur opacity-75"></div>
              <div className="relative bg-gray-900 rounded-lg p-8">
                <div className="text-4xl font-bold text-primary-400 mb-4">01</div>
                <h3 className="text-xl font-bold text-white mb-4">Connect Your Project</h3>
                <p className="text-gray-300">Import your existing project or start a new one with our templates.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg blur opacity-75"></div>
              <div className="relative bg-gray-900 rounded-lg p-8">
                <div className="text-4xl font-bold text-primary-400 mb-4">02</div>
                <h3 className="text-xl font-bold text-white mb-4">Start Coding</h3>
                <p className="text-gray-300">Write code with AI assistance and real-time suggestions.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg blur opacity-75"></div>
              <div className="relative bg-gray-900 rounded-lg p-8">
                <div className="text-4xl font-bold text-primary-400 mb-4">03</div>
                <h3 className="text-xl font-bold text-white mb-4">Ship Faster</h3>
                <p className="text-gray-300">Deploy your code with confidence and speed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="min-h-screen flex items-center justify-center bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-8">
            Ready to transform your development workflow?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of developers who are already using AI Chron to write better code, faster.
          </p>
          <Link
            to={isAuthenticated ? "/editor" : "/login"}
            className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg text-black bg-primary-400 hover:bg-primary-500 transition-all duration-300 transform hover:scale-105"
          >
            {isAuthenticated ? "Open Editor" : "Get Started Free"}
            <ChevronRightIcon className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 