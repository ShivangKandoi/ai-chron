import { Link } from 'react-router-dom';
import { 
  GithubIcon, 
  TwitterIcon, 
  DiscordIcon, 
  LinkedinIcon 
} from '../assets/icons/SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand and Description */}
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-primary-400">AI Chron</span>
            </Link>
            <p className="text-gray-400 text-base">
              Empowering developers with AI-driven tools for smarter, faster, and more collaborative coding experiences.
            </p>
            <div className="flex space-x-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                <GithubIcon className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                <DiscordIcon className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                <LinkedinIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-primary-400 tracking-wider uppercase">
                  Product
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/features" className="text-base text-gray-400 hover:text-primary-400">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-base text-gray-400 hover:text-primary-400">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/docs" className="text-base text-gray-400 hover:text-primary-400">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/releases" className="text-base text-gray-400 hover:text-primary-400">
                      Release Notes
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-primary-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-gray-400 hover:text-primary-400">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-base text-gray-400 hover:text-primary-400">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-base text-gray-400 hover:text-primary-400">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/press" className="text-base text-gray-400 hover:text-primary-400">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-400 tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/community" className="text-base text-gray-400 hover:text-primary-400">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-base text-gray-400 hover:text-primary-400">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/status" className="text-base text-gray-400 hover:text-primary-400">
                    Status
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-base text-gray-400 hover:text-primary-400">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} AI Chron. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-primary-400">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-primary-400">
              Privacy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-primary-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 