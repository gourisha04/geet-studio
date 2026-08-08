import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, CheckCircle, Award, Gift } from 'lucide-react';
import { getWorkshopById } from '../data/workshops';
import Button from '../components/ui/Button';
import PageTransition from '../components/ui/PageTransition';

export default function WorkshopDetail() {
  const { id } = useParams();
  const workshop = getWorkshopById(id);

  if (!workshop) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-warm-50 mb-4">Workshop Not Found</h1>
            <Button to="/workshops" variant="outline">Back to Workshops</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <img src={workshop.image} alt={workshop.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 bg-gold-500/90 text-dark-900 text-xs font-bold tracking-wider uppercase mb-4">
              Workshop
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-warm-50 mb-3">
              {workshop.name}
            </h1>
            <p className="text-sm text-dark-200">{workshop.style} · {workshop.level}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <h2 className="font-heading text-2xl font-bold text-warm-50 mb-4">About This Workshop</h2>
              <p className="text-dark-200 leading-relaxed mb-8">{workshop.longDescription}</p>

              <h3 className="font-heading text-lg font-bold text-warm-50 mb-4">Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {workshop.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-dark-200">
                    <CheckCircle className="w-4 h-4 text-gold-500 flex-shrink-0" />
                    {h}
                  </div>
                ))}
              </div>

              {/* Instructor */}
              <div className="bg-dark-800 border border-dark-600 p-6 mb-8">
                <h3 className="font-heading text-lg font-bold text-warm-50 mb-3">Instructor</h3>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-dark-600 flex items-center justify-center text-gold-500 font-heading font-bold text-xl flex-shrink-0">
                    {workshop.instructor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-warm-50 mb-1">{workshop.instructor}</p>
                    <p className="text-sm text-dark-200">{workshop.instructorBio}</p>
                  </div>
                </div>
              </div>

              {/* Includes */}
              <h3 className="font-heading text-lg font-bold text-warm-50 mb-4">What's Included</h3>
              <div className="space-y-2">
                {workshop.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-dark-200">
                    <Gift className="w-4 h-4 text-gold-500 flex-shrink-0" />
                    {item}
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
                Workshop Details
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-dark-300 mb-0.5">Date</p>
                    <p className="text-sm text-warm-50">{workshop.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-dark-300 mb-0.5">Time & Duration</p>
                    <p className="text-sm text-warm-50">{workshop.time}</p>
                    <p className="text-sm text-dark-200">{workshop.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-dark-300 mb-0.5">Location</p>
                    <p className="text-sm text-warm-50">{workshop.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-dark-300 mb-0.5">Seats</p>
                    <p className="text-sm text-warm-50">{workshop.availableSeats} of {workshop.totalSeats} available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-dark-300 mb-0.5">Level</p>
                    <p className="text-sm text-warm-50">{workshop.level}</p>
                  </div>
                </div>
              </div>

              <div className="py-4 border-t border-dark-600 mb-6">
                <p className="text-xs uppercase tracking-wider text-dark-300 mb-2">Workshop Fee</p>
                <p className="font-heading text-3xl font-bold text-gold-500">₹{workshop.price.toLocaleString()}</p>
              </div>

              <Button to={`/enroll/${workshop.id}`} variant="primary" size="lg" className="w-full">
                Register Now
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
