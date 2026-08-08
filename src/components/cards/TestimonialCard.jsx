import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-dark-800 border border-dark-600 p-6 md:p-8 relative group hover:border-dark-400 transition-all duration-500"
    >
      <Quote className="w-8 h-8 text-gold-500/30 mb-4" />

      <blockquote className="font-editorial text-lg md:text-xl italic text-warm-100 mb-6 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-gold-500 font-heading font-bold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-warm-50">{testimonial.name}</p>
          <p className="text-xs text-dark-200 uppercase tracking-wider">{testimonial.role}</p>
        </div>
      </div>

      {/* Gold accent line on bottom */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}
