import { motion } from 'framer-motion';
import Button from '../ui/Button';
import UpcomingEventsBanner from './UpcomingEventsBanner';

export default function Hero() {
  const titleText = "GEET STUDIO";
  const headlineText = "Find Your Expression.";
  const subtitleText = "A creative space for movement, music, performance, and people.";

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-20 md:pb-28 overflow-visible">
      {/* Background Video (clipped inside absolute container) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
        className="absolute top-1/4 left-8 w-px h-24 bg-gold-500/20 hidden md:block origin-top z-10"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-8 w-px h-24 bg-gold-500/20 hidden md:block origin-bottom z-10"
      />

      {/* Hero Central Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto my-auto py-8">
        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold-500 mb-6 font-semibold">Indore, Madhya Pradesh</p>
        </motion.div>

        {/* Brand Title */}
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

        {/* Headline Accent Line & Text */}
        <div className="mb-6 flex flex-col items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
            className="h-px bg-gold-500 mb-4"
          />
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="font-editorial text-3xl md:text-5xl italic text-gold-400 font-light"
            >
              {headlineText}
            </motion.h2>
          </div>
        </div>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-sm md:text-base opacity-85 text-warm-100 max-w-xl mx-auto mb-6 leading-relaxed"
        >
          {subtitleText}
        </motion.p>

        {/* Pill Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-1.5 rounded-full bg-dark-900/80 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-md">
            LEARN • CREATE • EXPRESS
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button to="/classes" variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-gold-500/10 tracking-widest font-bold text-xs uppercase px-8">
            EXPLORE GEET
          </Button>
          <Button to="/events" variant="outline" size="lg" className="w-full sm:w-auto tracking-widest font-bold text-xs uppercase px-8 border-gold-500/50 text-gold-500 hover:bg-gold-500/10">
            UPCOMING EVENTS
          </Button>
        </motion.div>
      </div>

      {/* Overlapping Upcoming Events Slideshow Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="-mb-24 md:-mb-28 relative z-30"
      >
        <UpcomingEventsBanner />
      </motion.div>
    </section>
  );
}
