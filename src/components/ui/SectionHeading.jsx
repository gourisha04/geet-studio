import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, align = 'center', light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <h2
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${
          light ? 'text-dark-900' : 'text-warm-50'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-editorial text-lg md:text-xl italic max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-dark-300' : 'text-dark-200'}`}
        >
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-px w-16 bg-gold-500 ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
