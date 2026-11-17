import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ChevronLeft, ChevronRight, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { api } from '../../utils/api';

const formatDate = (dateInput) => {
  if (!dateInput) return 'SCHEDULED';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput).toUpperCase();
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
};

export default function UpcomingEventsBanner() {
  const [bannerItems, setBannerItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchBannerContent = async () => {
      try {
        setFetchError(false);
        const [eventsRes, classesRes] = await Promise.allSettled([
          api.get('/api/events'),
          api.get('/api/classes'),
        ]);

        const rawEvents = (eventsRes.status === 'fulfilled' && eventsRes.value?.success && Array.isArray(eventsRes.value.data))
          ? eventsRes.value.data
          : [];

        const rawClasses = (classesRes.status === 'fulfilled' && classesRes.value?.success && Array.isArray(classesRes.value.data))
          ? classesRes.value.data
          : [];

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const nowMs = now.getTime();

        const formattedEvents = rawEvents.map((evt) => {
          const img = evt.media?.url || evt.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000&q=80';
          let dt = null;
          if (evt.date) {
            const parsed = new Date(evt.date);
            if (!isNaN(parsed.getTime())) dt = parsed.getTime();
          }
          if (dt === null && evt.createdAt) {
            const parsed = new Date(evt.createdAt);
            if (!isNaN(parsed.getTime())) dt = parsed.getTime();
          }
          if (dt === null) dt = nowMs;

          const isUpcoming = (dt >= nowMs) && evt.status !== 'PAST' && evt.status !== 'CANCELLED';

          return {
            id: `evt-${evt._id || evt.id}`,
            title: evt.title || 'Studio Event',
            badge: evt.type ? `${evt.type.toUpperCase()}` : 'UPCOMING SHOWCASE',
            badgeColor: 'bg-emerald-500 text-dark-950',
            date: formatDate(evt.date),
            time: evt.time || '6:00 PM – 9:00 PM',
            location: evt.location || 'Geet Studio, Indore',
            description: evt.description || 'Live showcase and special event at Geet Studio Indore.',
            image: img,
            link: '/events',
            price: evt.price || (evt.seats ? 'Registration Open' : 'Free Entry'),
            seatsLeft: evt.availableSeats !== undefined
              ? `${evt.availableSeats} Seats Left`
              : (evt.seats ? `${evt.seats} Seats Available` : 'Open for All'),
            timestamp: dt,
            isUpcoming,
          };
        });

        const formattedClasses = rawClasses.map((cls) => {
          const isWorkshop = cls.type === 'workshop';
          const img = (Array.isArray(cls.images) && cls.images[0]?.url)
            ? cls.images[0].url
            : (cls.image || 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1000&q=80');
          
          let dt = null;
          if (cls.startDate) {
            const parsed = new Date(cls.startDate);
            if (!isNaN(parsed.getTime())) dt = parsed.getTime();
          }
          if (dt === null && cls.createdAt) {
            const parsed = new Date(cls.createdAt);
            if (!isNaN(parsed.getTime())) dt = parsed.getTime();
          }
          if (dt === null) dt = nowMs;

          const isUpcoming = (dt >= nowMs) || cls.registrationStatus === 'OPEN';
          const scheduleText = Array.isArray(cls.days) ? cls.days.join(' / ') : (cls.schedule ? (Array.isArray(cls.schedule) ? cls.schedule.join(' / ') : cls.schedule) : 'Weekly');

          return {
            id: `cls-${cls._id || cls.id}`,
            title: cls.name || cls.title || 'Studio Masterclass',
            badge: isWorkshop ? 'INTENSIVE WORKSHOP' : (cls.category ? `${cls.category.toUpperCase()} CLASS` : 'STUDIO CLASS'),
            badgeColor: isWorkshop ? 'bg-amber-500 text-dark-950' : 'bg-gold-500 text-dark-950',
            date: cls.startDate ? formatDate(cls.startDate) : scheduleText,
            time: cls.classTiming || cls.time || '6:00 PM – 7:30 PM',
            location: cls.location || 'Geet Studio, Indore',
            description: cls.description || 'Professional studio session at Geet Studio Indore.',
            image: img,
            link: isWorkshop ? '/workshops' : '/classes',
            price: cls.fees ? `₹${cls.fees} / Month` : 'Enrollment Open',
            seatsLeft: cls.availableSeats !== undefined
              ? `${cls.availableSeats} Seats Left`
              : `${cls.instructor || 'Arpit Mahor'} • Open Batch`,
            timestamp: dt,
            isUpcoming,
          };
        });

        const combined = [...formattedEvents, ...formattedClasses];
        const upcomingItems = combined.filter((i) => i.isUpcoming);
        const pastItems = combined.filter((i) => !i.isUpcoming);

        // Sort upcoming items by nearest date first (ascending order)
        upcomingItems.sort((a, b) => a.timestamp - b.timestamp);

        // Sort past items by newest first (descending order)
        pastItems.sort((a, b) => b.timestamp - a.timestamp);

        // Prioritize upcoming over past; exclude past items when sufficient upcoming exist; max 4
        let top4 = [];
        if (upcomingItems.length >= 4) {
          top4 = upcomingItems.slice(0, 4);
        } else {
          top4 = [...upcomingItems, ...pastItems.slice(0, 4 - upcomingItems.length)];
        }

        if (!cancelled) {
          setBannerItems(top4);
        }
      } catch (err) {
        if (!cancelled) {
          setFetchError(true);
          setBannerItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBannerContent();
    return () => { cancelled = true; };
  }, []);

  const itemCount = bannerItems.length;
  const safeIndex = itemCount > 0 ? currentIndex % itemCount : 0;
  const currentEvent = bannerItems[safeIndex];

  const nextSlide = () => {
    if (itemCount > 0) {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }
  };

  const prevSlide = () => {
    if (itemCount > 0) {
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
    }
  };

  useEffect(() => {
    if (!isPaused && itemCount > 1) {
      timerRef.current = setInterval(nextSlide, 4500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, currentIndex, itemCount]);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 relative z-30">
        <div className="rounded-3xl p-8 bg-dark-900/80 border border-gold-500/20 text-center text-dark-300 text-xs animate-pulse">
          Loading studio banner highlights...
        </div>
      </div>
    );
  }

  if (fetchError && itemCount === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 relative z-30">
        <div className="rounded-3xl p-8 bg-dark-900/95 border border-red-500/30 backdrop-blur-xl shadow-2xl text-center">
          <p className="text-sm text-red-400 font-semibold mb-2">Unable to load studio highlights</p>
          <p className="text-xs text-dark-300 mb-4">Please check back shortly or explore our ongoing classes and events directly.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/classes" className="px-4 py-2 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gold-400 transition-colors">
              Explore Classes
            </Link>
            <Link to="/events" className="px-4 py-2 bg-dark-800 border border-dark-700 text-warm-50 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-gold-500/40 transition-colors">
              View Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentEvent || itemCount === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 relative z-30">
        <div className="rounded-3xl p-8 bg-dark-900/95 border border-gold-500/30 backdrop-blur-xl shadow-2xl text-center">
          <p className="font-heading text-lg font-bold text-warm-50 mb-1">New Showcases & Batches Announcing Soon</p>
          <p className="text-xs text-dark-300 mb-4">Explore upcoming studio programs, intensive workshops, and masterclasses at Geet Studio Indore.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/classes" className="px-4 py-2 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-gold-400 transition-colors">
              Explore Classes
            </Link>
            <Link to="/events" className="px-4 py-2 bg-dark-800 border border-dark-700 text-warm-50 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-gold-500/40 transition-colors">
              View Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative z-30">
      {/* Overlapping Slideshow Banner Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative rounded-3xl overflow-hidden bg-dark-900/95 border border-gold-500/30 backdrop-blur-xl shadow-2xl shadow-black/80 transition-all duration-500 group"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px] md:min-h-[240px]">
          {/* Left Content Side */}
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                {/* Header Badge Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${currentEvent.badgeColor}`}>
                    {currentEvent.badge}
                  </span>
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    {currentEvent.date}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-warm-50 tracking-tight leading-tight">
                  {currentEvent.title}
                </h3>

                {/* Event Description */}
                <p className="text-xs sm:text-sm text-dark-200 line-clamp-2 leading-relaxed font-light">
                  {currentEvent.description}
                </p>

                {/* Details Meta Row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-dark-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>{currentEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span className="truncate max-w-[200px]">{currentEvent.location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Actions Row */}
            <div className="pt-6 border-t border-dark-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link
                  to={currentEvent.link}
                  className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-dark-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-1.5 group/btn"
                >
                  <span>EXPLORE EVENT</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <span className="text-xs font-bold text-gold-400/90 hidden sm:inline-block">
                  {currentEvent.price}
                </span>
              </div>

              {/* Slide Navigation Controls */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono font-semibold text-gold-500/80 tracking-widest">
                  0{safeIndex + 1} / 0{itemCount}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="p-2 rounded-lg bg-dark-800 border border-dark-700 text-warm-50 hover:text-gold-400 hover:border-gold-500/50 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="p-2 rounded-lg bg-dark-800 border border-dark-700 text-warm-50 hover:text-gold-400 hover:border-gold-500/50 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Banner Side */}
          <div className="lg:col-span-5 relative min-h-[160px] lg:min-h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEvent.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent lg:bg-gradient-to-r lg:from-dark-900 lg:via-dark-900/30 lg:to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Overlaid Seats Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 bg-dark-950/80 border border-gold-500/40 backdrop-blur-md text-[10px] font-bold text-gold-400 rounded-full tracking-wider uppercase shadow-lg">
                {currentEvent.seatsLeft}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="h-1 bg-dark-800 w-full overflow-hidden">
          <motion.div
            key={safeIndex}
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? '0%' : '100%' }}
            transition={{ duration: 4.5, ease: 'linear' }}
            className="h-full bg-gold-500"
          />
        </div>
      </div>

      {/* Embedded Scroll Down Indicator */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={scrollToNextSection}
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400/80 hover:text-gold-300 transition-colors py-1 px-4 rounded-full bg-dark-900/60 border border-gold-500/20 backdrop-blur-sm cursor-pointer shadow-md group/scroll"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover/scroll:translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
