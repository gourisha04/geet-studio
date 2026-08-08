import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

export default function ClassCard({ classData }) {
  const discountedPrice = classData.discount
    ? Math.round(classData.price * (1 - classData.discount / 100))
    : classData.price;

  const seatsPercentage = (classData.availableSeats / classData.totalSeats) * 100;
  const seatsUrgent = seatsPercentage <= 33;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="h-full"
    >
      <Link to={`/classes/${classData.id}`} className="group block">
        <div className="bg-dark-800 border border-dark-600 hover:border-dark-400 transition-all duration-500 overflow-hidden">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={classData.image}
              alt={classData.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
            
            {/* Level badge */}
            <span className="absolute top-4 left-4 px-3 py-1 bg-dark-900/80 backdrop-blur-sm text-xs tracking-wider uppercase text-gold-500 border border-dark-400">
              {classData.level}
            </span>

            {/* Discount badge */}
            {classData.discount > 0 && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-gold-500 text-dark-900 text-xs font-bold tracking-wider">
                {classData.discount}% OFF
              </span>
            )}

            {/* Style */}
            <span className="absolute bottom-4 left-4 text-xs tracking-widest uppercase text-dark-200">
              {classData.style}
            </span>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-heading text-xl font-bold text-warm-50 mb-3 group-hover:text-gold-500 transition-colors duration-300">
              {classData.name}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <Calendar className="w-4 h-4 text-dark-300" />
                Starting {classData.startDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <Clock className="w-4 h-4 text-dark-300" />
                {classData.schedule.join(' / ')} · {classData.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-200">
                <MapPin className="w-4 h-4 text-dark-300" />
                {classData.location}
              </div>
            </div>

            {/* Seats */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.5 text-sm">
                  <Users className="w-4 h-4 text-dark-300" />
                  <span className={seatsUrgent ? 'text-rose-accent font-medium' : 'text-dark-200'}>
                    {classData.availableSeats} seats left
                  </span>
                </div>
                <span className="text-xs text-dark-300">{classData.totalSeats} total</span>
              </div>
              <div className="h-1 bg-dark-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${seatsUrgent ? 'bg-rose-accent' : 'bg-gold-500'}`}
                  style={{ width: `${100 - seatsPercentage}%` }}
                />
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-end justify-between pt-4 border-t border-dark-600">
              <div>
                {classData.discount > 0 ? (
                  <>
                    <span className="text-sm text-dark-300 line-through">₹{classData.price.toLocaleString()}</span>
                    <span className="text-xl font-bold text-gold-500 ml-2">₹{discountedPrice.toLocaleString()}</span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-gold-500">₹{classData.price.toLocaleString()}</span>
                )}
              </div>
              <span className="flex items-center gap-1 text-sm text-dark-200 group-hover:text-gold-500 transition-colors">
                View
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
