import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

export default function WorkshopCard({ workshop, featured = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="h-full"
    >
      <Link to={`/workshops/${workshop.id}`} className="group block">
        <div className={`bg-dark-800 border border-dark-600 hover:border-gold-700 transition-all duration-500 overflow-hidden ${featured ? 'md:flex' : ''}`}>
          {/* Image */}
          <div className={`relative overflow-hidden ${featured ? 'md:w-1/2 h-64 md:h-auto' : 'h-56'}`}>
            <img
              src={workshop.image}
              alt={workshop.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-gold-500/90 text-dark-900 text-xs font-bold tracking-wider uppercase">
                Workshop
              </span>
            </div>
          </div>

          {/* Content */}
          <div className={`p-6 ${featured ? 'md:w-1/2 md:p-8 md:flex md:flex-col md:justify-center' : ''}`}>
            <div className="text-xs tracking-widest uppercase text-gold-500 mb-2">
              {workshop.style} · {workshop.level}
            </div>

            <h3 className="font-heading text-xl md:text-2xl font-bold text-warm-50 mb-2 group-hover:text-gold-500 transition-colors duration-300">
              {workshop.name}
            </h3>

            <p className="text-sm text-dark-200 mb-4 line-clamp-2">
              {workshop.description}
            </p>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <Calendar className="w-4 h-4 text-gold-600" />
                {workshop.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <Clock className="w-4 h-4 text-gold-600" />
                {workshop.time} · {workshop.duration}
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <MapPin className="w-4 h-4 text-gold-600" />
                {workshop.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <Users className="w-4 h-4 text-gold-600" />
                {workshop.availableSeats} of {workshop.totalSeats} seats available
              </div>
            </div>

            <div className="flex items-end justify-between pt-4 border-t border-dark-600">
              <span className="text-2xl font-bold text-gold-500">₹{workshop.price.toLocaleString()}</span>
              <span className="flex items-center gap-1 text-sm text-dark-200 group-hover:text-gold-500 transition-colors uppercase tracking-wider">
                Details
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
