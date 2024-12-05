import { useState } from 'react';
import { 
  CubeTransparentIcon,
  TemplateIcon,
  ColorSwatchIcon,
  PuzzleIcon,
  ChipIcon,
  LightningBoltIcon,
  DeviceMobileIcon,
  DesktopComputerIcon,
  ViewGridIcon,
  AdjustmentsIcon,
  BeakerIcon,
  SparklesIcon,
  CogIcon,
  CloudIcon
} from '@heroicons/react/outline';
import Footer from '../components/Footer';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  gradient: string;
}

export default function Design() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Dashboard',
    'Analytics',
    'Development',
    'Documentation'
  ];

  const features = [
    {
      name: 'Responsive Design',
      description: 'Perfectly adapted for all screen sizes',
      icon: DeviceMobileIcon,
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Dark Mode',
      description: 'Built-in dark mode support',
      icon: ColorSwatchIcon,
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'Component Library',
      description: 'Extensive collection of reusable components',
      icon: ViewGridIcon,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Customizable',
      description: 'Easy to customize and extend',
      icon: AdjustmentsIcon,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'Modern Dashboard',
      description: 'Clean and modern dashboard layout with responsive components',
      category: 'Dashboard',
      icon: TemplateIcon,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Real-time data', 'Interactive charts', 'Customizable widgets']
    },
    {
      id: '2',
      name: 'Analytics Panel',
      description: 'Data visualization and analytics dashboard template',
      category: 'Analytics',
      icon: ChipIcon,
      gradient: 'from-purple-500 to-pink-500',
      features: ['Advanced filters', 'Export capabilities', 'Custom reports']
    },
    {
      id: '3',
      name: 'Code Editor',
      description: 'Dark themed code editor with syntax highlighting',
      category: 'Development',
      icon: CogIcon,
      gradient: 'from-emerald-500 to-green-500',
      features: ['Multiple themes', 'Code completion', 'Git integration']
    },
    {
      id: '4',
      name: 'Documentation',
      description: 'Beautiful documentation template with search functionality',
      category: 'Documentation',
      icon: BeakerIcon,
      gradient: 'from-orange-500 to-amber-500',
      features: ['Full-text search', 'Version control', 'Interactive examples']
    }
  ];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <>
      <div className="bg-gray-900">
        {/* Hero Section */}
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 animate-gradient" />
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/30 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse delay-700" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <CubeTransparentIcon className="h-24 w-24 text-primary-400 animate-float" />
              </div>
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                Design Templates
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Beautiful, responsive templates for your next project. Built with modern technologies and best practices.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="min-h-screen relative flex items-center justify-center bg-gray-800">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(51,65,85,0.15),transparent_70%)]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-base font-semibold uppercase tracking-wider text-primary-400">
                Features
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Everything you need to build faster
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="relative group h-full">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} opacity-75 group-hover:opacity-100 transition duration-500 blur-lg rounded-lg`}></div>
                  <div className="relative bg-gray-900 px-6 py-8 rounded-lg shadow-lg h-full flex flex-col">
                    <div>
                      <span className={`inline-flex items-center justify-center p-3 bg-gradient-to-r ${feature.gradient} rounded-md shadow-lg`}>
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-400 flex-grow">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="min-h-screen relative flex items-center justify-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(51,65,85,0.15),transparent_70%)]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Category Filter */}
            <div className="flex justify-center mb-12 space-x-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Templates Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="relative group bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${template.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative p-8">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center justify-center p-3 bg-gradient-to-r ${template.gradient} rounded-md shadow-lg`}>
                        <template.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                        {template.category}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">{template.name}</h3>
                    <p className="mt-2 text-gray-400">{template.description}</p>
                    <div className="mt-4 space-y-2">
                      {template.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-gray-300">
                          <SparklesIcon className="h-4 w-4 mr-2 text-primary-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-primary-400 hover:bg-primary-500 transition-colors duration-300">
                        Use Template
                        <LightningBoltIcon className="ml-2 -mr-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="min-h-screen relative flex items-center justify-center bg-gray-800">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to start building?</span>
                <span className="block text-primary-400 mt-2">Get started with our templates today.</span>
              </h2>
              <div className="mt-8 flex justify-center">
                <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-black bg-primary-400 hover:bg-primary-500 transition-all duration-300 transform hover:scale-105">
                  Browse All Templates
                  <CloudIcon className="ml-2 -mr-1 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 