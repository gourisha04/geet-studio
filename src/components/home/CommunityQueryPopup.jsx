import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function CommunityQueryPopup({ isOpen, onClose }) {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleReachUs = () => {
    onClose();
    navigate('/contact');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[210] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-md rounded-2xl overflow-hidden border p-6 md:p-8 shadow-2xl text-center ${
            isDark ? 'bg-dark-900 border-gold-500/40 text-warm-50' : 'bg-white border-gold-500/40 text-dark-950'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gold-500/10 text-gold-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-7 h-7" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-2">
            Any Question in Mind?
          </p>

          <h3 className="font-heading text-2xl font-bold mb-3">
            DO YOU WANT TO <span className="text-gold-500">REACH US?</span>
          </h3>

          <p className="text-sm opacity-85 leading-relaxed mb-6 font-sans">
            Have a question about our classes, workshops, community, or events? We'd love to hear from you — reach out to us directly!
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleReachUs}
              className="w-full sm:w-auto px-6 py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all shadow-lg cursor-pointer"
            >
              Yes, Reach Us
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 border border-dark-600 hover:border-gold-500 text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              Continue to About Us
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
