import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Camera, Video, ArrowRight } from 'lucide-react';

export default function EventCard({ event, variant = 'default' }) {
  const isUpcoming = event.type === 'upcoming';

  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -6, scale: 1.01 }}
        className="flex-shrink-0 w-72 md:w-80 h-full"
      >
        <Link to={`/events/${event.id}`} className="group block">
          <div className="bg-dark-800 border border-dark-600 hover:border-dark-400 transition-all duration-500 overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
              {event.photoCount > 0 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-warm-100">
                    <Camera className="w-3.5 h-3.5" /> {event.photoCount}
                  </span>
                  {event.videoCount > 0 && (
                    <span className="flex items-center gap-1 text-xs text-warm-100">
                      <Video className="w-3.5 h-3.5" /> {event.videoCount}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="text-xs tracking-widest uppercase text-gold-500 mb-1">{event.date}</div>
              <h4 className="font-heading text-lg font-bold text-warm-50 mb-1 group-hover:text-gold-500 transition-colors">
                {event.name}
              </h4>
              <p className="text-sm text-dark-200 line-clamp-2">{event.description}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="h-full"
    >
      <Link to={`/events/${event.id}`} className="group block">
        <div className="bg-dark-800 border border-dark-600 hover:border-dark-400 transition-all duration-500 overflow-hidden">
          <div className="relative h-56 overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />
            
            {isUpcoming && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-dark-900 text-xs font-bold tracking-wider uppercase">
                Upcoming
              </span>
            )}

            {!isUpcoming && event.photoCount > 0 && (
              <div className="absolute top-4 right-4 flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-warm-100 bg-dark-900/60 backdrop-blur-sm px-2 py-1">
                  <Camera className="w-3.5 h-3.5" /> {event.photoCount}
                </span>
                {event.videoCount > 0 && (
                  <span className="flex items-center gap-1 text-xs text-warm-100 bg-dark-900/60 backdrop-blur-sm px-2 py-1">
                    <Video className="w-3.5 h-3.5" /> {event.videoCount}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-gold-500 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              {event.date}
            </div>

            <h3 className="font-heading text-xl font-bold text-warm-50 mb-2 group-hover:text-gold-500 transition-colors duration-300">
              {event.name}
            </h3>

            <p className="text-sm text-dark-200 mb-4 line-clamp-2">{event.description}</p>

            <div className="flex items-center gap-2 text-sm text-dark-200 mb-4">
              <MapPin className="w-4 h-4 text-dark-300" />
              {event.location}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dark-600">
              {isUpcoming && event.price !== null ? (
                <span className="text-lg font-bold text-gold-500">
                  {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
                </span>
              ) : (
                <span className="text-sm text-dark-300">View Gallery</span>
              )}
              <span className="flex items-center gap-1 text-sm text-dark-200 group-hover:text-gold-500 transition-colors">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
