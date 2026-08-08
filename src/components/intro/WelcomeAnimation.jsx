import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WelcomeAnimation({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2800);
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-dark-950 flex items-center justify-center overflow-hidden"
        >
          {/* Animated background lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={phase >= 1 ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, delay: i * 0.15, ease: 'easeInOut' }}
                className="absolute h-px bg-dark-600"
                style={{
                  top: `${20 + i * 15}%`,
                  left: '10%',
                  right: '10%',
                  transformOrigin: 'left',
                }}
              />
            ))}
          </div>

          {/* Decorative circles */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={phase >= 1 ? { scale: 1, opacity: 0.08, rotate: 180 } : {}}
            transition={{ duration: 4, ease: 'easeOut' }}
            className="absolute w-[600px] h-[600px] border border-dashed border-gold-500 rounded-full"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={phase >= 1 ? { scale: 1, opacity: 0.05, rotate: -180 } : {}}
            transition={{ duration: 4, delay: 0.2, ease: 'easeOut' }}
            className="absolute w-[400px] h-[400px] border border-dashed border-gold-500 rounded-full"
          />

          {/* Main content */}
          <div className="relative text-center z-10">
            {/* GEET */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-warm-50"
              >
                GEET
              </motion.h1>
            </div>

            {/* STUDIO */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.3em] text-gold-500 -mt-2"
              >
                STUDIO
              </motion.h2>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mt-6"
            >
              <div className="h-px w-16 bg-gold-500 mx-auto mb-4" />
              <p className="font-editorial text-lg md:text-xl italic text-dark-200 tracking-wide">
                Where Movement Becomes Expression
              </p>
            </motion.div>
          </div>

          {/* Corner accents */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-8 left-8 w-12 h-12 border-t border-l border-dark-400"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-dark-400"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
