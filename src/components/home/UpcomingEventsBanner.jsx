import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

const bannerEvents = [
  {
    id: 'annual-dance-night-2026',
    title: 'Annual Dance Night 2026',
    badge: 'UPCOMING SHOWCASE',
    badgeColor: 'bg-gold-500 text-dark-950',
    date: '15 SEP 2026',
    time: '6:00 PM – 10:00 PM',
    location: 'Brilliant Convention Centre, Indore',
    description: 'The biggest night of the year. 200+ dancers, live music, and guest artists.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000&q=80',
    link: '/events',
    price: '₹500 / Ticket',
    seatsLeft: '280 Seats Available',
  },
  {
    id: 'bollywood-fusion-masterclass',
    title: 'Bollywood Fusion Masterclass',
    badge: 'INTENSIVE WORKSHOP',
    badgeColor: 'bg-amber-500 text-dark-950',
    date: '15 AUG 2026',
    time: '10:00 AM – 1:00 PM',
    location: 'Geet Studio, Indore',
    description: '3-hour masterclass blending traditional Bollywood with contemporary fusion.',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1000&q=80',
    link: '/workshops',
    price: '₹1,500 / Pass',
    seatsLeft: 'By Priya Sharma • 18 Seats Left',
  },
  {
    id: 'independence-day-special',
    title: 'Independence Day Celebration',
    badge: 'SPECIAL EVENT',
    badgeColor: 'bg-emerald-500 text-dark-950',
    date: '15 AUG 2026',
    time: '5:00 PM – 8:00 PM',
    location: 'Geet Studio, Indore',
    description: 'Patriotic dance performances, open stage, and community gathering.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=80',
    link: '/events',
    price: 'Free Entry',
    seatsLeft: 'Open for All • Reserve Spot',
  },
  {
    id: 'hiphop-choreography-intensive',
    title: 'Hip-Hop Choreography Intensive',
    badge: 'MASTERCLASS',
    badgeColor: 'bg-gold-400 text-dark-950',
    date: '22 AUG 2026',
    time: '2:00 PM – 6:00 PM',
    location: 'Geet Studio, Indore',
    description: '4-hour urban grooves, battle techniques, and high-energy routine.',
    image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1000&q=80',
    link: '/workshops',
    price: '₹2,000 / Pass',
    seatsLeft: 'By Arjun Mehra • 10 Seats Left',
  },
];

export default function UpcomingEventsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const currentEvent = bannerEvents[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerEvents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerEvents.length) % bannerEvents.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 4500);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, currentIndex]);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth',
    });
  };

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
                  0{currentIndex + 1} / 0{bannerEvents.length}
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
            key={currentIndex}
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
