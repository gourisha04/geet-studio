import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Instagram } from '../icons/Instagram';

const navColumns = [
  {
    title: 'Dance',
    links: [
      { name: 'Classes', path: '/classes' },
      { name: 'Workshops', path: '/workshops' },
      { name: 'Dance Styles', path: '/dance-styles' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { name: 'Events', path: '/events' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'About', path: '/about' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'Contact', path: '/contact' },
      { name: "What's New", path: '/updates' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold tracking-tight text-warm-50">
                GEET{' '}
              </span>
              <span className="font-heading text-2xl font-light tracking-[0.15em] text-gold-500">
                STUDIO
              </span>
            </Link>
            <p className="font-editorial text-base italic text-dark-200 mb-6 max-w-xs">
              Where Movement Becomes Expression
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <MapPin className="w-4 h-4 text-dark-300" />
                Indore, Madhya Pradesh
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <Phone className="w-4 h-4 text-dark-300" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <Mail className="w-4 h-4 text-dark-300" />
                hello@geetstudio.in
              </div>
            </div>

            {/* Social */}
            <div className="mt-6">
              <a
                href="https://instagram.com/geetstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-dark-200 hover:text-gold-500 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
                @geetstudio
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
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-dark-200 hover:text-warm-50 transition-colors duration-300"
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
        <div className="py-6 border-t border-dark-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-300">
            © 2026 Geet Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs text-dark-300 hover:text-dark-200 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-dark-300 hover:text-dark-200 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
