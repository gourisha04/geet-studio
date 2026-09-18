import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { api } from '../../utils/api';

export default function ReachUsSection() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/queries', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        message: formData.message,
        source: 'Contact Page',
      });
      if (res?.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', category: 'General', message: '' });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="reach-us"
      className={`py-24 relative overflow-hidden transition-colors ${
        isDark ? 'bg-dark-900 text-warm-50 border-t border-dark-800' : 'bg-warm-50 text-dark-950 border-t border-warm-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Info Column */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold mb-3"
            >
              GET IN TOUCH
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Let’s Create <span className="text-gold-500 font-light italic">Something.</span>
            </motion.h2>

            <p className="text-base opacity-85 leading-relaxed mb-8 max-w-lg">
              Have a question about classes, workshops, events, collaborations, or the Geet Community? Reach out. We’d love to hear what you’re looking to create, learn, or be a part of.
            </p>

            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-60 uppercase font-semibold">📍 STUDIO</p>
                  <a
                    href="https://maps.app.goo.gl/bZWfcrfVsUsPM9RP7?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-gold-500 transition-colors inline-flex items-center gap-1.5"
                  >
                    Indore, Madhya Pradesh, India
                    <span className="text-[10px] text-gold-500 uppercase tracking-widest underline font-semibold ml-1">View Map →</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-60 uppercase font-semibold">📞 PHONE</p>
                  <a href="tel:8770409447" className="font-medium hover:text-gold-500 transition-colors">
                    +91 87704 09447
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-60 uppercase font-semibold">✉️ EMAIL</p>
                  <a href="mailto:geetdancestudio@gmail.com" className="font-medium hover:text-gold-500 transition-colors">
                    geetdancestudio@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl border shadow-2xl ${
              isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-warm-200'
            }`}
          >
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h3 className="font-heading text-2xl font-bold mb-2">Enquiry Sent!</h3>
                <p className="text-sm opacity-80 mb-6">
                  Thank you! We have received your message and our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-gold-500 text-dark-950 text-xs uppercase font-bold tracking-widest hover:bg-gold-400 transition-all"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Reach Out <span className="text-gold-500 font-light">to Us</span>
                </h3>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                      isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                        isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                        isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                    WHAT CAN WE HELP YOU WITH? *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                      isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Dance Classes">Dance Classes</option>
                    <option value="Music Classes">Music Classes</option>
                    <option value="Fitness & Movement">Fitness & Movement</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Aerial">Aerial</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Events & Choreography">Events & Choreography</option>
                    <option value="Geet Community">Geet Community</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Work With Us">Work With Us</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                    MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us a little about what you're looking for..."
                    className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                      isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-semibold text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {loading ? 'Sending Enquiry...' : 'SEND ENQUIRY →'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
