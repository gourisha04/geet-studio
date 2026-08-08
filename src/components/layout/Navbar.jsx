import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Classes', path: '/classes' },
  { name: 'Workshops', path: '/workshops' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
          scrolled
            ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-heading text-xl md:text-2xl font-bold tracking-tight text-warm-50 group-hover:text-gold-500 transition-colors duration-300">
                GEET
              </span>
              <span className="font-heading text-xl md:text-2xl font-light tracking-[0.15em] text-gold-500">
                STUDIO
              </span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              >
                <Link
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 relative group pb-1 ${
                    location.pathname === link.path
                      ? 'text-gold-500'
                      : 'text-dark-100 hover:text-warm-50'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-4"
          >
            <Link
              to="/classes"
              className="hidden md:inline-flex items-center px-5 py-2 bg-gold-500 text-dark-900 text-xs uppercase tracking-widest font-semibold hover:bg-gold-400 transition-all duration-300"
            >
              Join a Class
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-warm-50 hover:text-gold-500 transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-dark-950/98 backdrop-blur-xl flex flex-col"
          >
            {/* Close */}
            <div className="flex justify-end p-5">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-warm-50 hover:text-gold-500 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`font-heading text-3xl font-light tracking-wide transition-colors duration-300 ${
                      location.pathname === link.path
                        ? 'text-gold-500'
                        : 'text-warm-100 hover:text-gold-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6"
              >
                <Link
                  to="/classes"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center px-8 py-3 bg-gold-500 text-dark-900 text-sm uppercase tracking-widest font-semibold hover:bg-gold-400 transition-all duration-300"
                >
                  Join a Class
                </Link>
              </motion.div>
            </div>

            {/* Bottom */}
            <div className="p-6 text-center">
              <p className="font-editorial text-sm italic text-dark-300">
                Where Movement Becomes Expression
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
