import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Award, CheckCircle, Send, CheckCircle2, X } from 'lucide-react';
import { getClassById } from '../data/classes';
import Button from '../components/ui/Button';
import PageTransition from '../components/ui/PageTransition';
import { useTheme } from '../context/ThemeContext';

export default function ClassDetail() {
  const { id } = useParams();
  const classData = getClassById(id);
  const { isDark } = useTheme();

  const [showRegModal, setShowRegModal] = useState(false);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '', age: '', batch: '' });

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    try {
      await fetch('/api/enrollments/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId: id, ...regForm }),
      }).catch(() => {});
      setRegSubmitted(true);
    } finally {
      setRegLoading(false);
    }
  };

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

              <button
                onClick={() => setShowRegModal(true)}
                className="w-full py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Register Interest
              </button>
              <p className="text-xs text-dark-300 text-center mt-3">Our team will contact you with details</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md" onClick={() => setShowRegModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative w-full max-w-lg rounded-2xl border p-6 md:p-8 ${
              isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-white border-warm-200 text-dark-950'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShowRegModal(false)} className="absolute top-4 right-4 text-gold-500 text-lg font-bold cursor-pointer"><X className="w-5 h-5" /></button>

            {regSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold mb-2">Registration Submitted!</h3>
                <p className="text-sm opacity-80 mb-2">
                  Your interest in <strong className="text-gold-500">{classData.name}</strong> has been registered successfully.
                </p>
                <p className="text-sm opacity-70 mb-6">Our team will contact you shortly with class details, schedule, and fees.</p>
                <button
                  onClick={() => { setRegSubmitted(false); setShowRegModal(false); }}
                  className="px-6 py-2.5 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegSubmit} className="space-y-4">
                <div>
                  <p className="text-xs uppercase text-gold-500 font-semibold tracking-wider">Register Interest</p>
                  <h3 className="font-heading text-2xl font-bold">{classData.name}</h3>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Full Name *</label>
                  <input type="text" required value={regForm.name} onChange={(e) => setRegForm({ ...regForm, name: e.target.value })} placeholder="Enter your name" className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Email *</label>
                    <input type="email" required value={regForm.email} onChange={(e) => setRegForm({ ...regForm, email: e.target.value })} placeholder="email@example.com" className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Phone *</label>
                    <input type="tel" required value={regForm.phone} onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })} placeholder="10-digit number" className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Age *</label>
                    <input type="number" required value={regForm.age} onChange={(e) => setRegForm({ ...regForm, age: e.target.value })} placeholder="25" className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Preferred Batch</label>
                    <select value={regForm.batch} onChange={(e) => setRegForm({ ...regForm, batch: e.target.value })} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}>
                      <option value="">Select batch</option>
                      <option>{classData.schedule ? classData.schedule.join(' / ') + ' · ' + (classData.time || '') : 'Default Batch'}</option>
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={regLoading} className="w-full py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg">
                  {regLoading ? 'Submitting...' : 'Submit Registration'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </PageTransition>
  );
}
