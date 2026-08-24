import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Instagram } from '../icons/Instagram';
import { useTheme } from '../../context/ThemeContext';

const navColumns = [
  {
    title: 'Services',
    links: [
      { name: 'Dance', path: '/services/dance' },
      { name: 'Music', path: '/services/music' },
      { name: 'Fitness', path: '/services/fitness' },
      { name: 'Events & Productions', path: '/services/events-productions' },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'Explore Community', path: '/community' },
      { name: 'Join as Lead', path: '/register' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { name: 'Classes', path: '/classes' },
      { name: 'Workshops', path: '/workshops' },
      { name: 'Instructors', path: '/instructors' },
      { name: 'Dance Styles', path: '/dance-styles' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { name: 'Events', path: '/events' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: "What's New", path: '/updates' },
    ],
  },
];

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t transition-colors ${
      isDark ? 'bg-dark-950 border-dark-700' : 'bg-white border-warm-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className={`font-heading text-2xl font-bold tracking-tight ${isDark ? 'text-warm-50' : 'text-dark-950'}`}>
                GEET{' '}
              </span>
              <span className="font-heading text-2xl font-light tracking-[0.15em] text-gold-500">
                STUDIO
              </span>
            </Link>
            <p className={`font-editorial text-base italic mb-6 max-w-xs ${isDark ? 'text-dark-200' : 'text-dark-300'}`}>
              Where Movement Becomes Expression
            </p>

            <div className="space-y-3">
              <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-dark-200' : 'text-dark-400'}`}>
                <MapPin className="w-4 h-4 text-gold-500/70" />
                Indore, Madhya Pradesh
              </div>
              <a href="tel:+918770409447" className={`flex items-center gap-2 text-sm transition-colors hover:text-gold-500 ${isDark ? 'text-dark-200' : 'text-dark-400'}`}>
                <Phone className="w-4 h-4 text-gold-500/70" />
                +91 87704 09447
              </a>
              <a href="mailto:geetdancestudio@gmail.com" className={`flex items-center gap-2 text-sm transition-colors hover:text-gold-500 ${isDark ? 'text-dark-200' : 'text-dark-400'}`}>
                <Mail className="w-4 h-4 text-gold-500/70" />
                geetdancestudio@gmail.com
              </a>
            </div>

            {/* Social */}
            <div className="mt-6">
              <a
                href="https://www.instagram.com/the_geetstudio?igsh=YWE4cWVyNXM4OTFu"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm hover:text-gold-500 transition-colors duration-300 ${isDark ? 'text-dark-200' : 'text-dark-400'}`}
              >
                <Instagram className="w-4 h-4" />
                @the_geetstudio
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gold-500 font-semibold mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`text-sm transition-colors duration-300 ${
                        isDark ? 'text-dark-200 hover:text-warm-50' : 'text-dark-400 hover:text-dark-900'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={`py-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDark ? 'border-dark-700' : 'border-warm-200'
        }`}>
          <p className={`text-xs ${isDark ? 'text-dark-300' : 'text-dark-300'}`}>
            © {new Date().getFullYear()} Geet Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className={`text-xs transition-colors ${isDark ? 'text-dark-300 hover:text-dark-200' : 'text-dark-300 hover:text-dark-500'}`}>
              Privacy Policy
            </Link>
            <Link to="/contact" className={`text-xs transition-colors ${isDark ? 'text-dark-300 hover:text-dark-200' : 'text-dark-300 hover:text-dark-500'}`}>
              Terms & Conditions
            </Link>
            <Link to="/contact" className={`text-xs transition-colors ${isDark ? 'text-dark-300 hover:text-dark-200' : 'text-dark-300 hover:text-dark-500'}`}>
              Cancellation / Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
