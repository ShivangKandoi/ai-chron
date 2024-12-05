import { 
  CubeTransparentIcon, 
  UserGroupIcon, 
  ChipIcon, 
  CloudUploadIcon,
  LightningBoltIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  SparklesIcon,
  ChatAlt2Icon,
  ClockIcon,
  LocationMarkerIcon,
  HandIcon,
  KeyIcon,
  DatabaseIcon,
  ServerIcon,
  CogIcon,
  BeakerIcon,
  TerminalIcon,
  CodeIcon,
  DocumentIcon,
  CollectionIcon,
  AdjustmentsIcon,
  OfficeBuildingIcon,
  UserIcon,
  DesktopComputerIcon,
  PencilAltIcon
} from '@heroicons/react/outline';
import Footer from '../components/Footer';

export default function About() {
  const stats = [
    { name: 'Founded', value: '2024' },
    { name: 'Employees', value: '50+' },
    { name: 'Countries', value: '20+' },
    { name: 'Active Users', value: '10k+' },
  ];

  const values = [
    {
      title: 'Innovation',
      description: "Pushing the boundaries of what's possible with AI and development tools.",
      icon: ChipIcon,
    },
    {
      title: 'Collaboration',
      description: 'Building a community where developers can work together seamlessly.',
      icon: UserGroupIcon,
    },
    {
      title: 'Security',
      description: 'Ensuring the highest standards of data protection and privacy.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Global Impact',
      description: 'Making development tools accessible to developers worldwide.',
      icon: GlobeAltIcon,
    },
  ];

  const features = [
    {
      name: 'Documentation',
      description: 'Comprehensive guides and API references for developers.',
      icon: DocumentTextIcon,
      href: '/docs',
    },
    {
      name: 'Cloud Integration',
      description: 'Seamless deployment and scaling capabilities.',
      icon: CloudUploadIcon,
      href: '/cloud',
    },
    {
      name: 'Real-time Collaboration',
      description: 'Work together with your team in real-time.',
      icon: UserGroupIcon,
      href: '/collaboration',
    },
    {
      name: 'Performance',
      description: 'Lightning-fast execution and response times.',
      icon: LightningBoltIcon,
      href: '/performance',
    },
  ];

  const techStack = [
    {
      name: 'React',
      description: 'Powers our dynamic and responsive user interface, enabling smooth interactions and real-time updates.',
      category: 'Frontend',
    },
    {
      name: 'TypeScript',
      description: 'Ensures type safety and enhances code quality across our entire application.',
      category: 'Language',
    },
    {
      name: 'Node.js',
      description: 'Drives our high-performance backend services and real-time processing capabilities.',
      category: 'Backend',
    },
    {
      name: 'MongoDB',
      description: 'Provides flexible and scalable data storage for user projects and collaboration features.',
      category: 'Database',
    },
    {
      name: 'Docker',
      description: 'Enables consistent deployment and isolated code execution environments.',
      category: 'Infrastructure',
    },
    {
      name: 'Python',
      description: 'Powers our AI capabilities and code analysis features.',
      category: 'AI & Processing',
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'AI Chron launches with core features for AI-powered development.',
    },
    {
      year: '2024 Q2',
      title: 'Community Growth',
      description: 'Reached 10,000+ active developers using the platform.',
    },
    {
      year: '2024 Q3',
      title: 'Enterprise Solutions',
      description: 'Launched enterprise-grade features and support.',
    },
    {
      year: '2024 Q4',
      title: 'Global Expansion',
      description: 'Extended our services to developers worldwide.',
    },
  ];

  const benefits = [
    {
      title: 'Learn & Grow',
      description: 'Access AI-powered learning resources and improve your coding skills.',
      icon: AcademicCapIcon,
      color: 'from-blue-400 to-indigo-500',
    },
    {
      title: 'Real-time Support',
      description: 'Get instant help from AI and community experts.',
      icon: ChatAlt2Icon,
      color: 'from-green-400 to-emerald-500',
    },
    {
      title: 'Time Saving',
      description: 'Automate repetitive tasks and focus on what matters.',
      icon: ClockIcon,
      color: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Innovation',
      description: 'Stay ahead with cutting-edge AI development tools.',
      icon: SparklesIcon,
      color: 'from-yellow-400 to-orange-500',
    },
  ];

  const documentation = [
    {
      title: 'Getting Started',
      description: 'Quick start guides and basic concepts',
      icon: DocumentIcon,
      link: '/docs/getting-started'
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation and examples',
      icon: CodeIcon,
      link: '/docs/api'
    },
    {
      title: 'Tutorials',
      description: 'Step-by-step guides for common tasks',
      icon: AcademicCapIcon,
      link: '/docs/tutorials'
    },
    {
      title: 'Best Practices',
      description: 'Recommended patterns and practices',
      icon: AdjustmentsIcon,
      link: '/docs/best-practices'
    }
  ];

  const careers = [
    {
      position: 'Senior AI Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      icon: ChipIcon
    },
    {
      position: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      icon: PencilAltIcon
    },
    {
      position: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote',
      type: 'Full-time',
      icon: ServerIcon
    },
    {
      position: 'Technical Writer',
      department: 'Documentation',
      location: 'Remote',
      type: 'Contract',
      icon: DocumentTextIcon
    }
  ];

  const security = [
    {
      title: 'End-to-End Encryption',
      description: 'Your code and data are encrypted in transit and at rest',
      icon: KeyIcon
    },
    {
      title: 'SOC2 Compliance',
      description: 'Enterprise-grade security standards and compliance',
      icon: ShieldCheckIcon
    },
    {
      title: 'Data Privacy',
      description: 'GDPR and CCPA compliant data handling',
      icon: DatabaseIcon
    },
    {
      title: 'Access Control',
      description: 'Fine-grained permissions and role-based access',
      icon: UserGroupIcon
    }
  ];

  const partners = [
    {
      name: 'Cloud Partners',
      companies: ['AWS', 'Google Cloud', 'Azure'],
      icon: CloudUploadIcon
    },
    {
      name: 'Technology Partners',
      companies: ['GitHub', 'GitLab', 'Bitbucket'],
      icon: CogIcon
    },
    {
      name: 'Security Partners',
      companies: ['Auth0', 'Okta', 'OneLogin'],
      icon: ShieldCheckIcon
    },
    {
      name: 'Infrastructure Partners',
      companies: ['Cloudflare', 'Fastly', 'Akamai'],
      icon: ServerIcon
    }
  ];

  return (
    <>
      <div className="bg-gray-900">
        {/* Hero Section with Animated Background */}
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 animate-gradient" />
            {/* Animated Circles */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/30 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse delay-700" />
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <CubeTransparentIcon className="h-24 w-24 text-primary-400 animate-float" />
              </div>
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400">
                About AI Chron
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                Empowering developers with next-generation AI tools for smarter, faster, and more collaborative development.
              </p>
              <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4 max-w-4xl mx-auto">
                {stats.map((stat) => (
                  <div key={stat.name} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500 animate-tilt"></div>
                    <div className="relative bg-gray-900 rounded-lg p-6">
                      <p className="text-5xl font-extrabold text-primary-400 group-hover:text-primary-300 transition-colors">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm font-medium text-gray-400">
                        {stat.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Section with 3D Cards */}
        <div className="min-h-screen flex items-center justify-center bg-gray-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(62,61,117,0.1),transparent_50%)]" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Our Values
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                The principles that guide everything we do
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="relative group perspective"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    perspective: '1000px'
                  }}
                >
                  <div className="relative h-full bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg transform-gpu transition-all duration-500 group-hover:rotate-y-12 group-hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-lg transform-gpu transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-primary-500 to-purple-500 text-white">
                        <value.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-6 text-lg font-medium text-white">
                        {value.title}
                      </h3>
                      <p className="mt-4 text-base text-gray-400">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section with Floating Elements */}
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,61,117,0.15),transparent_70%)]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Platform Features
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Everything you need to build amazing things
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className="relative group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative bg-gray-900 p-8 rounded-lg transform-gpu transition-all duration-500 hover:scale-105">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-primary-500 to-purple-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-4 text-base text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Technology Stack</h2>
              <p className="mt-4 text-lg text-gray-400">
                Carefully chosen technologies that power our platform
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="relative group bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-primary-400">{tech.name}</h3>
                    <span className="text-xs font-medium text-gray-500 px-3 py-1 bg-gray-800 rounded-full">
                      {tech.category}
                    </span>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Why Choose AI Chron</h2>
              <p className="mt-4 text-lg text-gray-400">
                Experience the benefits of AI-powered development
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="relative group rounded-2xl p-8 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${benefit.color}" />
                  <div className="relative z-10">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${benefit.color}`}>
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-4 text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Journey</h2>
              <p className="mt-4 text-lg text-gray-400">
                Milestones that mark our progress
              </p>
            </div>
            <div className="mt-16 relative">
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-700 transform -translate-x-1/2" />
              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div className="absolute left-1/2 w-4 h-4 rounded-full bg-primary-400 transform -translate-x-1/2" />
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg transform hover:scale-105 transition-all duration-300">
                        <span className="text-primary-400 font-bold">{milestone.year}</span>
                        <h3 className="mt-2 text-xl font-semibold text-white">{milestone.title}</h3>
                        <p className="mt-2 text-gray-300">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-purple-500/10" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Join Our Community</h2>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                Be part of a growing community of developers who are shaping the future of coding with AI.
              </p>
              <div className="mt-12 grid gap-8 sm:grid-cols-3">
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg">
                  <div className="text-5xl font-bold text-primary-400">10K+</div>
                  <div className="mt-2 text-gray-300">Active Developers</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg">
                  <div className="text-5xl font-bold text-primary-400">50+</div>
                  <div className="mt-2 text-gray-300">Countries</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg">
                  <div className="text-5xl font-bold text-primary-400">1M+</div>
                  <div className="mt-2 text-gray-300">Projects Created</div>
                </div>
              </div>
              <div className="mt-12">
                <a
                  href="#join-waitlist"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-primary-400 hover:bg-primary-500 transition-all duration-300 hover:scale-105"
                >
                  Join the Waitlist
                  <SparklesIcon className="ml-2 -mr-1 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Section */}
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Documentation</h2>
              <p className="mt-4 text-lg text-gray-400">
                Comprehensive resources to help you succeed
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {documentation.map((doc) => (
                <a
                  key={doc.title}
                  href={doc.link}
                  className="relative group bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-400 text-white">
                    <doc.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-white">{doc.title}</h3>
                  <p className="mt-2 text-base text-gray-400">{doc.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Careers Section */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Join Our Team</h2>
              <p className="mt-4 text-lg text-gray-400">
                Help us shape the future of development
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              {careers.map((job) => (
                <div
                  key={job.position}
                  className="relative group bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <job.icon className="h-6 w-6 text-primary-400" />
                      <div>
                        <h3 className="text-lg font-medium text-white">{job.position}</h3>
                        <p className="mt-2 text-sm text-gray-400">{job.department}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-400/10 text-primary-400">
                      {job.type}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5" />
                    {job.location}
                  </div>
                  <div className="mt-6">
                    <button className="text-primary-400 hover:text-primary-300 font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Security First</h2>
              <p className="mt-4 text-lg text-gray-400">
                Enterprise-grade security for your peace of mind
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {security.map((item) => (
                <div
                  key={item.title}
                  className="relative group bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-2 text-base text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Partners</h2>
              <p className="mt-4 text-lg text-gray-400">
                Working together to deliver excellence
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="relative group bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <partner.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-white">{partner.name}</h3>
                  <div className="mt-4 space-y-2">
                    {partner.companies.map((company) => (
                      <div
                        key={company}
                        className="text-sm text-gray-400 flex items-center"
                      >
                        <HandIcon className="h-4 w-4 mr-2 text-gray-500" />
                        {company}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
} 