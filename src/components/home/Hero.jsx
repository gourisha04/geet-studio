import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  const titleText = "GEET STUDIO";
  const subtitleText = "Where Movement Becomes Expression";

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <motion.video
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1920&q=80"
        >
          <source src="/bg-dance.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Decorative vertical lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
        className="absolute top-1/4 left-8 w-px h-24 bg-gold-500/20 hidden md:block origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-8 w-px h-24 bg-gold-500/20 hidden md:block origin-bottom"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* City Location */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold-500 mb-6">Indore, Madhya Pradesh</p>
        </motion.div>

        {/* Cinematic Title Reveal */}
        <div className="overflow-hidden mb-4 select-none">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-warm-50 flex items-center justify-center flex-wrap gap-x-4">
            {titleText.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + (wordIndex * 5 + charIndex) * 0.04,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* Animated Accent Line & Tagline */}
        <div className="mb-6 flex flex-col items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
            className="h-px bg-gold-500 mb-4"
          />
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="font-editorial text-xl md:text-2xl italic text-warm-200"
            >
              {subtitleText}
            </motion.p>
          </div>
        </div>

        {/* Core Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-xs tracking-[0.4em] uppercase text-dark-100 mb-10"
        >
          Learn · Move · Perform
        </motion.p>

        {/* Animated Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button to="/classes" variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-gold-500/5">
            Explore Classes
          </Button>
          <Button to="/workshops" variant="outline" size="lg" className="w-full sm:w-auto">
            Upcoming Workshops
          </Button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-dark-200 select-none">Scroll</span>
          <ChevronDown className="w-4 h-4 text-dark-200" />
        </motion.div>
      </motion.div>
    </section>
  );
}
