import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import PageTransition from '../components/ui/PageTransition';
import { api } from '../utils/api';

export default function Enroll() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [itemType, setItemType] = useState('class');
  const [loadingItem, setLoadingItem] = useState(true);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetchItem = async () => {
      try {
        try {
          const classRes = await api.get(`/api/classes/${id}`);
          if (!cancelled && classRes?.success && classRes.data) {
            setItem(classRes.data);
            setItemType(classRes.data.type === 'workshop' ? 'workshop' : 'class');
            return;
          }
        } catch {
          // Fall through to event lookup
        }

        try {
          const eventRes = await api.get(`/api/events/${id}`);
          if (!cancelled && eventRes?.success && eventRes.data) {
            setItem(eventRes.data);
            setItemType('event');
            return;
          }
        } catch {
          // Event lookup failed
        }

        if (!cancelled) setItem(null);
      } finally {
        if (!cancelled) setLoadingItem(false);
      }
    };
    fetchItem();
    return () => { cancelled = true; };
  }, [id]);

  if (loadingItem) {
    return <PageTransition><div className="min-h-screen flex items-center justify-center pt-20 text-dark-200">Loading registration details...</div></PageTransition>;
  }

  if (!item) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-warm-50 mb-4">Not Found</h1>
            <Button to="/classes" variant="outline">Back to Classes</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const data = await api.post('/api/enrollments', {
        classId: item._id || item.id || id,
        className: item.name || item.title,
        studentName: form.name,
        email: form.email,
        phone: form.phone,
        age: form.age,
        message: form.message,
      });

      if (!data?.success) {
        throw new Error(data?.message || 'Failed to submit enrollment request.');
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="pt-28 pb-20 md:pt-36 md:pb-32 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">{itemType === 'event' ? 'Event Registration Request' : itemType === 'workshop' ? 'Workshop Enrollment Request' : 'Class Enrollment Request'}</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-warm-50 mb-2">
              Join {item.name || item.title}
            </h1>
            <div className="h-px w-16 bg-gold-500 mb-8" />
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-800 border border-gold-500/30 p-8 text-center space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center text-3xl text-gold-500">
                ✨
              </div>
              <h2 className="font-heading text-2xl font-bold text-warm-50">{itemType === 'event' ? 'Registration Received!' : 'Enrollment Request Received!'}</h2>
              <p className="text-dark-200 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-gold-500 font-semibold">{form.name}</span>. Your request to join{' '}
                <span className="text-warm-50 font-semibold">{item.name || item.title}</span> has been saved and sent to our team. We will reach out to you via call/WhatsApp shortly.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button to="/classes" variant="primary">
                  Explore More Classes
                </Button>
                <Button to="/contact" variant="outline">
                  Contact Studio
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-dark-800 border border-dark-600 p-6 md:p-8 space-y-6"
            >
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/40 p-4 text-red-400 text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="bg-dark-900/60 p-4 border border-dark-700 text-xs text-dark-200">
                <span className="text-gold-500 font-semibold uppercase tracking-wider block mb-1">Selected {itemType === 'event' ? 'Event' : itemType === 'workshop' ? 'Workshop' : 'Class'} Details</span>
                <p className="text-warm-50 text-sm font-semibold">{item.name || item.title}</p>
                {item.schedule && <p className="mt-1">Schedule: {Array.isArray(item.schedule) ? item.schedule.join(' / ') : item.schedule} {item.time ? `· ${item.time}` : ''}</p>}
                {item.date && <p className="mt-1">Date: {new Date(item.date).toLocaleDateString('en-IN')} {item.time ? `· ${item.time}` : ''}</p>}
                {item.level && <p className="mt-0.5">Level: {item.level}</p>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-900 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-900 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-900 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Age (Optional)</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full bg-dark-900 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="e.g. 24"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Additional Message / Preferred Schedule (Optional)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-dark-900 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Tell us about your prior dance experience or timing preferences..."
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                  {loading ? 'Submitting Request...' : 'Submit Enrollment Request'}
                </Button>
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
