import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function DanceStyleCard({ style, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/dance-styles/${style.id}`} className="group block relative h-80 md:h-96 overflow-hidden">
        {/* Background image */}
        <img
          src={style.image}
          alt={style.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/95 via-dark-900/40 to-dark-900/20 group-hover:from-dark-950/80 transition-all duration-500" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {/* Decorative line */}
          <div
            className="w-8 h-0.5 mb-4 transition-all duration-500 group-hover:w-12"
            style={{ backgroundColor: style.color }}
          />

          <h3 className="font-heading text-2xl md:text-3xl font-bold text-warm-50 mb-1 transition-transform duration-500 group-hover:translate-y-[-4px]">
            {style.name}
          </h3>

          <p className="font-editorial text-sm italic text-dark-200 mb-3">{style.tagline}</p>

          <p className="text-sm text-dark-100 line-clamp-2 mb-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            {style.description}
          </p>

          <div className="flex items-center gap-2 text-sm text-gold-500 uppercase tracking-wider">
            Explore
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
