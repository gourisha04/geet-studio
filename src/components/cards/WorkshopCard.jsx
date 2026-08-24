import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, Sparkles, CheckCircle2, User } from 'lucide-react';

export default function WorkshopCard({ workshop, featured = false, onQuickRegister }) {
  const percentSeatsLeft = Math.round((workshop.availableSeats / workshop.totalSeats) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <div className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 ${
        featured
          ? 'bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border-gold-500/40 md:flex'
          : 'bg-dark-900/90 border-dark-700/80 hover:border-gold-500/40 flex flex-col justify-between'
      }`}>
        {/* Thumbnail & Badges */}
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2 h-72 md:h-auto' : 'h-60'}`}>
          <img
            src={workshop.image}
            alt={workshop.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
          
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gold-500 text-dark-950 text-[10px] font-black uppercase tracking-wider rounded-md shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Intensive Workshop
            </span>
            <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-gold-400 text-[10px] font-bold uppercase rounded-md border border-gold-500/30">
              {workshop.style}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-warm-50">
            <span className="px-2.5 py-1 rounded-md bg-dark-950/80 backdrop-blur-md border border-dark-700 font-medium">
              {workshop.level}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              {workshop.includes?.includes('Certificate') ? '📜 Certificate Included' : 'Masterclass'}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className={`p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6 ${featured ? 'md:w-1/2' : ''}`}>
          <div>
            <h3 className="font-heading text-2xl font-bold text-warm-50 mb-3 group-hover:text-gold-500 transition-colors duration-300">
              {workshop.name}
            </h3>

            <p className="text-xs text-dark-200 leading-relaxed mb-5 line-clamp-2">
              {workshop.description}
            </p>

            {/* Meta details */}
            <div className="space-y-2.5 text-xs text-dark-200 bg-dark-950/50 p-4 rounded-2xl border border-dark-800">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold text-warm-50">
                  <Calendar className="w-4 h-4 text-gold-500 shrink-0" />
                  {workshop.date}
                </span>
                <span className="flex items-center gap-1 opacity-70">
                  <Clock className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  {workshop.time}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-2 opacity-80">
                  <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                  {workshop.location}
                </span>
                <span className="flex items-center gap-1 text-gold-400 font-medium">
                  <User className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  {workshop.instructor}
                </span>
              </div>

              {/* Seats progress bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="opacity-75 flex items-center gap-1">
                    <Users className="w-3 h-3 text-gold-500" /> Seat Availability
                  </span>
                  <span className={`font-bold ${percentSeatsLeft < 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {workshop.availableSeats} of {workshop.totalSeats} seats left
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-dark-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentSeatsLeft < 40 ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-gradient-to-r from-gold-500 to-emerald-400'
                    }`}
                    style={{ width: `${100 - percentSeatsLeft}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & CTAs */}
          <div className="pt-4 border-t border-dark-800/80 flex items-center justify-between gap-4">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-dark-300 font-semibold">Fee per Person</span>
              <span className="text-2xl font-bold text-gold-500 font-heading">₹{workshop.price.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/workshops/${workshop.id}`}
                className="px-4 py-2.5 rounded-xl border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1"
              >
                Details
              </Link>
              <button
                type="button"
                onClick={() => onQuickRegister && onQuickRegister(workshop)}
                className="px-5 py-2.5 rounded-xl bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow-lg hover:shadow-gold-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                Enroll <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
