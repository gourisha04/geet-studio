import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Returns current date parts in Asia/Kolkata timezone.
 * Automatically updates daily — no manual admin intervention needed.
 */
function getISTDate() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const parts = formatter.formatToParts(now);
  const day = parts.find(p => p.type === 'day')?.value || '01';
  const month = parts.find(p => p.type === 'month')?.value?.toUpperCase() || 'JANUARY';
  const year = parts.find(p => p.type === 'year')?.value || '2026';
  return { day, month, year };
}

export default function DailyUpdate({ onComplete }) {
  const navigate = useNavigate();
  const [date] = useState(getISTDate);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleExplore = () => {
    navigate('/updates');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[190] bg-dark-950 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-warm-50"
            style={{
              top: `${i * 5}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
      </div>

      <div className="relative text-center z-10 px-6">
        {/* Updated today */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs tracking-[0.4em] uppercase text-gold-500 mb-8"
        >
          Updated Today
        </motion.p>

        {/* Auto-computed IST Date */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          <p className="font-heading text-7xl md:text-9xl font-bold text-warm-50 leading-none">
            {date.day}
          </p>
          <p className="font-heading text-2xl md:text-4xl font-light tracking-[0.2em] text-warm-200 mt-2">
            {date.month} {date.year}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-px w-24 bg-gold-500 mx-auto my-8"
        />

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="font-editorial text-lg md:text-xl italic text-dark-200 mb-8"
        >
          Something new is waiting at Geet Studio
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExplore}
          className="inline-flex items-center gap-2 px-8 py-3 border border-gold-500 text-gold-500 text-sm uppercase tracking-widest hover:bg-gold-500 hover:text-dark-900 transition-all duration-300 cursor-pointer"
        >
          Explore What's New
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
