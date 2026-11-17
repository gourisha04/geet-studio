import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Camera, Video, ArrowRight, Sparkles, Award } from 'lucide-react';

export default function EventCard({ event, variant = 'default' }) {
  const isUpcoming = event.type === 'upcoming' || event.status === 'UPCOMING';

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
          <div className="bg-dark-800 border border-dark-600 hover:border-gold-500/50 transition-all duration-500 rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${isUpcoming ? 'bg-gold-500 text-dark-950' : 'bg-dark-900/90 border border-dark-700 text-gold-400'}`}>
                  {isUpcoming ? 'Upcoming Show' : 'Past Showcase'}
                </span>
              </div>
            </div>
            <div className="p-5 space-y-2">
              <div className="text-xs tracking-widest uppercase text-gold-500 font-semibold">{event.date}</div>
              <h4 className="font-heading text-lg font-bold text-warm-50 group-hover:text-gold-400 transition-colors">
                {event.name}
              </h4>
              <p className="text-xs text-dark-200 line-clamp-2 leading-relaxed">{event.description}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (!isUpcoming) {
    // Distinct Past Event Card Design (Muted, Archived Showcase style)
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -6 }}
        className="h-full"
      >
        <Link to={`/events/${event.id}`} className="group block h-full">
          <div className="bg-dark-900/90 border border-dark-800 hover:border-gold-500/40 transition-all duration-500 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="relative h-52 overflow-hidden bg-dark-950">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover grayscale-[30%] opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

                <span className="absolute top-4 left-4 px-3 py-1 bg-dark-950/80 border border-dark-700 text-warm-200 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <Award className="w-3 h-3 text-gold-500" />
                  ARCHIVED SHOWCASE
                </span>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-warm-100">
                  <span className="flex items-center gap-1 text-[11px] bg-dark-950/80 border border-dark-700 px-2.5 py-1 rounded backdrop-blur-sm text-gold-400">
                    <Calendar className="w-3 h-3" /> {event.date}
                  </span>
                  {(event.photoCount > 0 || event.videoCount > 0) && (
                    <div className="flex items-center gap-2">
                      {event.photoCount > 0 && (
                        <span className="flex items-center gap-1 text-[11px] bg-dark-950/80 px-2 py-0.5 rounded backdrop-blur-sm text-warm-200">
                          <Camera className="w-3 h-3" /> {event.photoCount}
                        </span>
                      )}
                      {event.videoCount > 0 && (
                        <span className="flex items-center gap-1 text-[11px] bg-dark-950/80 px-2 py-0.5 rounded backdrop-blur-sm text-warm-200">
                          <Video className="w-3 h-3" /> {event.videoCount}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-heading text-xl font-bold text-warm-100 group-hover:text-gold-400 transition-colors duration-300">
                  {event.name}
                </h3>
                <p className="text-xs text-dark-300 line-clamp-2 leading-relaxed">{event.description}</p>
                <div className="flex items-center gap-2 text-xs text-dark-300 pt-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-500/70" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="flex items-center justify-between pt-4 border-t border-dark-800 text-xs font-semibold text-dark-300 group-hover:text-gold-400 transition-colors">
                <span>VIEW SHOWCASE RECAP</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Upcoming Event Card Design (Vibrant Gold Border & Active Glowing Badge)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link to={`/events/${event.id}`} className="group block h-full">
        <div className="bg-dark-900 border border-gold-500/40 hover:border-gold-500 transition-all duration-500 rounded-2xl overflow-hidden shadow-xl hover:shadow-gold-500/10 flex flex-col justify-between h-full relative">
          {/* Glowing Top Ambient Line */}
          <div className="h-1 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 w-full" />

          <div>
            <div className="relative h-60 overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 bg-gold-500 text-dark-950 text-xs font-bold tracking-wider uppercase rounded shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-dark-950 animate-pulse" />
                  UPCOMING SHOWCASE
                </span>
              </div>

              {event.price !== undefined && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-dark-950/90 border border-gold-500/40 text-gold-400 text-xs font-bold rounded-full backdrop-blur-md shadow-lg">
                    {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-gold-400">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>{event.date}</span>
                {event.time && <span>• {event.time}</span>}
              </div>

              <h3 className="font-heading text-2xl font-bold text-warm-50 group-hover:text-gold-400 transition-colors duration-300">
                {event.name}
              </h3>

              <p className="text-xs md:text-sm text-dark-200 line-clamp-2 leading-relaxed">{event.description}</p>

              <div className="flex items-center gap-2 text-xs text-dark-200 pt-1">
                <MapPin className="w-3.5 h-3.5 text-gold-500" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="flex items-center justify-between pt-4 border-t border-dark-800 text-xs font-bold uppercase tracking-wider text-gold-500 group-hover:text-gold-400 transition-colors">
              <span>REGISTER / EXPLORE EVENT</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
