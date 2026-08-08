import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, X } from 'lucide-react';
import { upcomingEvents } from '../../data/events';

export default function UpcomingEventsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-950/85 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-dark-800 border border-dark-500 overflow-hidden max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-dark-200 hover:text-warm-50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-8 pb-4 border-b border-dark-600">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">Coming Up</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-warm-50">
            Upcoming at Geet
          </h2>
        </div>

        {/* Events */}
        <div className="p-6 space-y-4">
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            >
              <Link
                to={`/events/${event.id}`}
                onClick={onClose}
                className="group flex gap-4 p-4 bg-dark-700 border border-dark-600 hover:border-dark-400 transition-all duration-300"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-gold-500 mb-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                  <h4 className="font-heading text-sm font-bold text-warm-50 mb-1 group-hover:text-gold-500 transition-colors">
                    {event.name}
                  </h4>
                  <p className="text-xs text-dark-200 line-clamp-2">{event.description}</p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 flex items-center">
                  <ArrowRight className="w-4 h-4 text-dark-300 group-hover:text-gold-500 transition-all duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <Link
            to="/events"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 border border-dark-500 text-sm uppercase tracking-wider text-dark-200 hover:text-gold-500 hover:border-gold-500 transition-all duration-300"
          >
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
