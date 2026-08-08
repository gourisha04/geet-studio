import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Award, CheckCircle } from 'lucide-react';
import { getClassById } from '../data/classes';
import Button from '../components/ui/Button';
import PageTransition from '../components/ui/PageTransition';

export default function ClassDetail() {
  const { id } = useParams();
  const classData = getClassById(id);

  if (!classData) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-warm-50 mb-4">Class Not Found</h1>
            <Button to="/classes" variant="outline">Back to Classes</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const discountedPrice = classData.discount
    ? Math.round(classData.price * (1 - classData.discount / 100))
    : classData.price;

  const seatsPercentage = (classData.availableSeats / classData.totalSeats) * 100;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <img
          src={classData.image}
          alt={classData.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">
              {classData.style} · {classData.level}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-warm-50 mb-3">
              {classData.name}
            </h1>
            <p className="text-sm text-dark-200">Instructor: {classData.instructor}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="font-heading text-2xl font-bold text-warm-50 mb-4">About the Class</h2>
              <p className="text-dark-200 leading-relaxed mb-8">{classData.longDescription}</p>

              {/* Highlights */}
              <h3 className="font-heading text-lg font-bold text-warm-50 mb-4">What You'll Learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {classData.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-dark-200">
                    <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-dark-800 border border-dark-600 p-6 sticky top-24"
            >
              <h3 className="font-heading text-lg font-bold text-warm-50 mb-6 pb-4 border-b border-dark-600">
                Class Information
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-dark-300 mb-0.5">Dance Style</p>
                    <p className="text-sm text-warm-50">{classData.style}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-dark-300 mb-0.5">Location</p>
                    <p className="text-sm text-warm-50">{classData.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-dark-300 mb-0.5">Schedule</p>
                    <p className="text-sm text-warm-50">{classData.schedule.join(' / ')}</p>
                    <p className="text-sm text-dark-200">{classData.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-dark-300 mb-0.5">Duration</p>
                    <p className="text-sm text-warm-50">{classData.duration} per class · {classData.courseDuration}</p>
                  </div>
                </div>
              </div>

              {/* Seats */}
              <div className="py-4 border-t border-b border-dark-600 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold-500" />
                    <span className="text-sm text-warm-50">Seats</span>
                  </div>
                  <span className={`text-sm font-medium ${seatsPercentage <= 33 ? 'text-rose-accent' : 'text-gold-500'}`}>
                    {classData.availableSeats} of {classData.totalSeats} available
                  </span>
                </div>
                <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${seatsPercentage <= 33 ? 'bg-rose-accent' : 'bg-gold-500'}`}
                    style={{ width: `${100 - seatsPercentage}%` }}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-dark-300 mb-2">Pricing</p>
                {classData.discount > 0 ? (
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-lg text-dark-300 line-through">₹{classData.price.toLocaleString()}</span>
                      <span className="px-2 py-0.5 bg-gold-500/10 text-gold-500 text-xs font-medium">
                        {classData.discount}% OFF
                      </span>
                    </div>
                    <p className="font-heading text-3xl font-bold text-gold-500">₹{discountedPrice.toLocaleString()}</p>
                  </div>
                ) : (
                  <p className="font-heading text-3xl font-bold text-gold-500">₹{classData.price.toLocaleString()}</p>
                )}
              </div>

              <Button to={`/enroll/${classData.id}`} variant="primary" size="lg" className="w-full">
                Enroll Now
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
