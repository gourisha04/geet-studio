import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import EventCard from '../components/cards/EventCard';
import PageTransition from '../components/ui/PageTransition';
import { api } from '../utils/api';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function Events() {
  const [eventRecords, setEventRecords] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api.get('/api/events')
      .then((res) => {
        if (!cancelled && res?.success && Array.isArray(res.data)) {
          setEventRecords(res.data.map((event) => ({
            ...event,
            id: event._id,
            name: event.title,
            image: event.media?.url || 'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=800&q=80',
            type: event.status === 'UPCOMING' ? 'upcoming' : 'past',
            date: event.date ? new Date(event.date).toLocaleDateString('en-IN') : 'TBA',
            price: event.price ?? null,
            totalSeats: event.seats ?? null,
            availableSeats: event.seats ?? null,
          })));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const upcoming = eventRecords.filter((event) => event.type === 'upcoming');
  const past = eventRecords.filter((event) => event.type !== 'upcoming');

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-dark-950 border-b border-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" /> EVENTS
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 tracking-tight text-warm-50">
            Where Ideas Become <span className="text-gold-500 font-light italic">Experiences.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm md:text-base opacity-80 leading-relaxed">
            Performances, celebrations, showcases, and creative productions brought to life through movement, music, people, and production.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-gold-500 mb-1">What’s happening at Geet</p>
            <h3 className="font-heading text-2xl font-bold text-warm-50">Upcoming Events</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-heading text-xl font-bold text-warm-50 mb-6">Past Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Second Layer: Need Us to Create an Event With You? */}
      <section className="pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 md:p-12 rounded-3xl border border-gold-500/30 bg-gradient-to-r from-dark-900 via-dark-950 to-dark-900 text-center space-y-6">
            <h3 className="font-heading text-2xl md:text-4xl font-bold text-warm-50">
              Need Us to Create an Event With You?
            </h3>
            <p className="max-w-2xl mx-auto text-sm md:text-base opacity-80 leading-relaxed text-dark-200">
              From choreography and performances to complete creative production, Geet Studio helps turn occasions into experiences people remember.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-gold-400 uppercase tracking-wider py-2">
              <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-dark-700">EVENT CHOREOGRAPHY</span>
              <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-dark-700">LIVE PERFORMANCES</span>
              <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-dark-700">ARTIST MANAGEMENT</span>
              <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-dark-700">CREATIVE PRODUCTION</span>
              <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-dark-700">EVENT EXPERIENCES</span>
            </div>
            <div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-400 transition-all rounded-xl shadow-lg"
              >
                PLAN AN EVENT WITH US →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
