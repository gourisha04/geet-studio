import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Camera, Video, CheckCircle } from 'lucide-react';
import { getEventById, events } from '../data/events';
import Button from '../components/ui/Button';
import PageTransition from '../components/ui/PageTransition';
import EventCard from '../components/cards/EventCard';

export default function EventDetail() {
  const { id } = useParams();
  const event = getEventById(id);

  if (!event) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-warm-50 mb-4">Event Not Found</h1>
            <Button to="/events" variant="outline">Back to Events</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const isUpcoming = event.type === 'upcoming';
  const relatedEvents = events.filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[450px] flex items-end overflow-hidden">
        <img src={event.image} alt={event.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-dark-900/20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className={`inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase mb-4 ${isUpcoming ? 'bg-gold-500 text-dark-900' : 'bg-dark-600 text-warm-100'}`}>
              {isUpcoming ? 'Upcoming Event' : 'Past Event'}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-warm-50 mb-3">
              {event.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-dark-200">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
              {event.time && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</span>}
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <h2 className="font-heading text-2xl font-bold text-warm-50 mb-4">About This Event</h2>
            <p className="text-dark-200 leading-relaxed mb-8 text-lg">{event.longDescription}</p>

            {/* Highlights */}
            <h3 className="font-heading text-lg font-bold text-warm-50 mb-4">Event Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {event.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-dark-200">
                  <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>

            {/* Media counts for past events */}
            {!isUpcoming && (event.photoCount > 0 || event.videoCount > 0) && (
              <div className="flex items-center gap-6 py-6 border-t border-b border-dark-600 mb-8">
                {event.photoCount > 0 && (
                  <div className="flex items-center gap-2 text-dark-200">
                    <Camera className="w-5 h-5 text-gold-500" />
                    <span className="text-lg font-medium text-warm-50">{event.photoCount}</span>
                    <span className="text-sm">Photos</span>
                  </div>
                )}
                {event.videoCount > 0 && (
                  <div className="flex items-center gap-2 text-dark-200">
                    <Video className="w-5 h-5 text-gold-500" />
                    <span className="text-lg font-medium text-warm-50">{event.videoCount}</span>
                    <span className="text-sm">Videos</span>
                  </div>
                )}
              </div>
            )}

            {/* Event Media Gallery (for past events) */}
            {!isUpcoming && event.media && event.media.length > 0 && (
              <div className="mt-8 mb-12">
                <h3 className="font-heading text-xl font-bold text-warm-50 mb-6">
                  Event Media Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.media.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative overflow-hidden aspect-video border border-dark-600 bg-dark-800 group"
                    >
                      {item.type === 'video' ? (
                        <video
                          controls
                          className="w-full h-full object-cover"
                          poster={event.image}
                        >
                          <source src={item.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        />
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-dark-950/80 to-transparent p-3 pointer-events-none">
                        <p className="text-xs text-warm-100">{item.alt}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA for upcoming */}
            {isUpcoming && (
              <div className="bg-dark-800 border border-dark-600 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gold-500" />
                    <span className="text-sm text-dark-200">
                      {event.availableSeats} of {event.totalSeats} seats available
                    </span>
                  </div>
                  <p className="font-heading text-2xl font-bold text-gold-500">
                    {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
                  </p>
                </div>
                <Button to={`/enroll/${event.id}`} variant="primary" size="lg">
                  Register Now
                </Button>
              </div>
            )}
          </motion.div>

          {/* Related Events */}
          <div className="mt-16">
            <h3 className="font-heading text-xl font-bold text-warm-50 mb-8">More Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
