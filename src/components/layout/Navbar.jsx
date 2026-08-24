import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    children: [
      { name: 'Dance', path: '/services/dance' },
      { name: 'Music', path: '/services/music' },
      { name: 'Fitness', path: '/services/fitness' },
      { name: 'Events & Productions', path: '/services/events-productions' },
    ],
  },
  { name: 'Community', path: '/community', badge: 'HOT' },
  { name: 'Classes', path: '/classes' },
  { name: 'Workshops', path: '/workshops' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Instructors', path: '/instructors' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, logo } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setUserMenuOpen(false);
    if (userMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [userMenuOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700 py-1.5 md:py-2'
              : 'bg-warm-50/95 backdrop-blur-md border-b border-warm-200 py-1.5 md:py-2'
            : 'bg-transparent py-3 md:py-4'
        }`}
      >
        <div className="max-w-[98%] mx-auto px-1 md:px-3 flex items-center justify-between">
          {/* Logo — Prominently Sized */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="Geet Studio Logo"
                className="h-16 sm:h-20 md:h-28 lg:h-32 max-h-24 md:max-h-28 w-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: 'easeOut' }}
                className={link.children ? 'relative group/dropdown' : ''}
              >
                <Link
                  to={link.path}
                  className={`text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 relative group pb-1 font-medium flex items-center gap-1 ${
                    link.name === 'Community'
                      ? isActive(link.path)
                        ? 'text-gold-500 font-bold'
                        : isDark
                          ? 'text-gold-400 hover:text-gold-500 font-semibold'
                          : 'text-gold-600 hover:text-gold-500 font-semibold'
                      : isActive(link.path)
                        ? 'text-gold-500'
                        : isDark
                          ? 'text-dark-100 hover:text-warm-50'
                          : 'text-dark-400 hover:text-dark-900'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-red-600 to-amber-500 text-[9px] font-extrabold text-white uppercase tracking-wider animate-pulse shadow-md">
                      {link.badge}
                    </span>
                  )}
                  {link.children && <ChevronDown className="w-3 h-3" />}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full ${isActive(link.path) ? 'w-full' : ''}`} />
                </Link>

                {/* Dropdown for Services */}
                {link.children && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 z-50`}>
                    <div className={`w-56 rounded-xl border shadow-2xl overflow-hidden ${
                      isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-warm-200'
                    }`}>
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-5 py-3 text-xs uppercase tracking-wider font-medium transition-colors ${
                            isActive(child.path)
                              ? 'text-gold-500 bg-gold-500/10'
                              : isDark
                                ? 'text-warm-100 hover:text-gold-500 hover:bg-dark-700'
                                : 'text-dark-600 hover:text-gold-600 hover:bg-warm-100'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right side: Theme toggle + User + CTA + Hamburger */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex items-center gap-3"
          >
            {/* User Menu / Login */}
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                    isDark
                      ? 'border-dark-600 hover:border-gold-500 text-warm-100'
                      : 'border-warm-300 hover:border-gold-500 text-dark-700'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-[80px] truncate">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 top-full mt-2 w-52 rounded-xl border shadow-xl overflow-hidden ${
                        isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-warm-200'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={`px-4 py-3 border-b ${isDark ? 'border-dark-700' : 'border-warm-200'}`}>
                        <p className="text-xs font-semibold truncate">{user?.name}</p>
                        <p className="text-[10px] opacity-60 truncate">{user?.email}</p>
                        <span className={`inline-block mt-1 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded ${
                          user?.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                          user?.role === 'lead' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-gold-500/20 text-gold-500'
                        }`}>{user?.role}</span>
                      </div>

                      <div className="py-1">
                        {user?.role === 'lead' && (
                          <Link to="/lead/dashboard" className={`flex items-center gap-2 px-4 py-2.5 text-xs transition-colors ${isDark ? 'hover:bg-dark-700' : 'hover:bg-warm-100'}`}>
                            <LayoutDashboard className="w-3.5 h-3.5" /> Lead Dashboard
                          </Link>
                        )}
                        {user?.role === 'admin' && (
                          <Link to="/admin" className={`flex items-center gap-2 px-4 py-2.5 text-xs transition-colors ${isDark ? 'hover:bg-dark-700' : 'hover:bg-warm-100'}`}>
                            <LayoutDashboard className="w-3.5 h-3.5" /> Admin Panel
                          </Link>
                        )}
                      </div>

                      <div className={`border-t py-1 ${isDark ? 'border-dark-700' : 'border-warm-200'}`}>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className={`flex items-center gap-2 px-4 py-2.5 text-xs w-full text-left text-red-400 transition-colors cursor-pointer ${isDark ? 'hover:bg-dark-700' : 'hover:bg-warm-100'}`}
                        >
                          <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                  isDark
                    ? 'border-dark-600 hover:border-gold-500 text-warm-100 hover:text-gold-500'
                    : 'border-warm-300 hover:border-gold-500 text-dark-700 hover:text-gold-600'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Login
              </Link>
            )}

            {/* CTA */}
            <Link
              to="/classes"
              className="hidden lg:inline-flex items-center px-5 py-2 bg-gold-500 text-dark-900 text-xs uppercase tracking-widest font-semibold hover:bg-gold-400 transition-all duration-300"
            >
              Join a Class
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors cursor-pointer ${
                isDark ? 'text-warm-50 hover:text-gold-500' : 'text-dark-900 hover:text-gold-600'
              }`}
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
            className={`fixed inset-0 z-[90] backdrop-blur-xl flex flex-col ${
              isDark ? 'bg-dark-950/98' : 'bg-warm-50/98'
            }`}
          >
            {/* Top bar with close button */}
            <div className="flex items-center justify-end p-5">
              <button
                onClick={() => setMobileOpen(false)}
                className={`w-10 h-10 flex items-center justify-center transition-colors cursor-pointer ${
                  isDark ? 'text-warm-50 hover:text-gold-500' : 'text-dark-900 hover:text-gold-600'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-5 overflow-y-auto py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`font-heading text-2xl font-light tracking-wide transition-colors duration-300 ${
                      link.name === 'Community'
                        ? isActive(link.path)
                          ? 'text-gold-500 font-semibold'
                          : 'text-gold-400 font-normal'
                        : isActive(link.path)
                          ? 'text-gold-500'
                          : isDark
                            ? 'text-warm-100 hover:text-gold-500'
                            : 'text-dark-600 hover:text-gold-600'
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-gradient-to-r from-red-600 to-amber-500 text-[10px] font-extrabold text-white uppercase tracking-wider animate-pulse shadow-md align-middle">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Auth links in mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex flex-col items-center gap-3 mt-4"
              >
                {isAuthenticated ? (
                  <>
                    {user?.role === 'lead' && (
                      <Link
                        to="/lead/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className={`text-sm transition-colors ${isDark ? 'text-warm-200 hover:text-gold-500' : 'text-dark-500 hover:text-gold-600'}`}
                      >
                        Lead Dashboard
                      </Link>
                    )}
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileOpen(false)}
                        className={`text-sm transition-colors ${isDark ? 'text-warm-200 hover:text-gold-500' : 'text-dark-500 hover:text-gold-600'}`}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium transition-colors ${isDark ? 'text-warm-200 hover:text-gold-500' : 'text-dark-500 hover:text-gold-600'}`}
                  >
                    Login / Register
                  </Link>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="mt-4"
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
              <p className={`font-editorial text-sm italic ${isDark ? 'text-dark-300' : 'text-dark-200'}`}>
                Where Movement Becomes Expression
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
