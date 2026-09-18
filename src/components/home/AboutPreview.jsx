import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function Counter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { number: 3, suffix: '+ YEARS', label: 'BUILDING & CREATING' },
  { number: 2000, suffix: '+', label: 'STUDENTS & PARTICIPANTS' },
  { number: 50, suffix: '+', label: 'WORKSHOPS & EXPERIENCES' },
];

export default function AboutPreview() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[4/5] group rounded-2xl">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80"
                alt="Geet Studio"
                className="w-full h-full object-cover cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent pointer-events-none" />
            </div>
            {/* Accent frame */}
            <motion.div
              whileHover={{ x: 6, y: 6 }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500/20 -z-10 cursor-pointer rounded-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-4 font-semibold">ABOUT</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-warm-50 mb-6 leading-tight">
              More Than a Studio. <span className="text-gold-500 font-light italic">A Space to Create.</span>
            </h2>
            <div className="space-y-4 text-sm md:text-base text-dark-200 leading-relaxed mb-10">
              <p>
                Geet Studio began with dance. But the idea was always bigger than dance.
              </p>
              <p>
                What started as a creative space in Katni has grown through years of teaching, performing, choreographing, collaborating, and building communities. Today, Geet Studio is evolving in Indore into a space where movement, music, fitness, performance, and people come together.
              </p>
              <p>
                We believe creativity shouldn’t be confined to a stage or a classroom. It should be something you can learn, practice, experience, share, and turn into something of your own.
              </p>
              <p className="italic text-gold-300 font-serif">
                From your first class to your next performance, from learning a new skill to finding people to create with, Geet Studio exists to give that journey a place to happen.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-dark-600">
              {stats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="font-heading text-2xl md:text-3xl font-bold text-gold-500 mb-1">
                    <Counter target={stat.number} suffix={stat.suffix} />
                  </p>
                  <p className="text-[11px] tracking-wider uppercase text-dark-200 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
