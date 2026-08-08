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
  { number: 10, suffix: '+', label: 'Dance Styles' },
  { number: 500, suffix: '+', label: 'Students' },
  { number: 50, suffix: '+', label: 'Workshops' },
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
            <div className="relative overflow-hidden aspect-[4/5] group">
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
              className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500/20 -z-10 cursor-pointer"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-4">About</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-warm-50 mb-6 leading-tight">
              Where Every Step{' '}
              <span className="text-gold-500">Tells a Story</span>
            </h2>
            <p className="font-editorial text-lg md:text-xl italic text-dark-200 mb-6 leading-relaxed">
              Geet Studio is a creative space where dancers of every level come together to learn, express, and perform.
            </p>
            <p className="text-sm text-dark-200 leading-relaxed mb-10">
              Founded in the heart of Indore, Geet Studio has grown into one of central India's most vibrant dance communities. 
              We believe dance is more than technique — it's a language that connects people, cultures, and emotions. 
              From Bollywood to Contemporary, Hip-Hop to Salsa, our studio is a home for every style and every story.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-dark-600">
              {stats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="font-heading text-3xl md:text-4xl font-bold text-gold-500 mb-1">
                    <Counter target={stat.number} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs tracking-wider uppercase text-dark-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
