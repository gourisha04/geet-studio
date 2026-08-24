import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
    } catch (err) {
      console.error(err);
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
              Get In Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              DO YOU HAVE ANY <span className="text-gold-500 font-light italic">QUERY?</span>
            </motion.h2>

            <p className="text-base opacity-85 leading-relaxed mb-8 max-w-lg">
              Have questions about dance admissions, upcoming workshops, event choreography, or community lead hiring? Send us a message and our team in Indore will respond promptly.
            </p>

            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-60 uppercase font-semibold">Studio Location</p>
                  <p className="font-medium">Indore, Madhya Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-60 uppercase font-semibold">Phone Support</p>
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
                  <p className="text-xs opacity-60 uppercase font-semibold">Business Email</p>
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
                <h3 className="font-heading text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-sm opacity-80 mb-6">
                  Thank you! Your query has been logged. We will reach back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-gold-500 text-dark-950 text-xs uppercase font-bold tracking-widest hover:bg-gold-400 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Reach Us <span className="text-gold-500 font-light">Directly</span>
                </h3>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                    Your Name *
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
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@gmail.com"
                      className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                        isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="8770409447"
                      className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                        isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                    Select Domain / Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                      isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  >
                    <option value="General">General Studio Query</option>
                    <option value="Dance">Dance Classes & Styles</option>
                    <option value="Music">Music & Vocals</option>
                    <option value="Fitness">Fitness & Zumba</option>
                    <option value="Events & Productions">Events & Production Quotes</option>
                    <option value="Community">Community Lead Request</option>
                    <option value="Classes">Regular Classes</option>
                    <option value="Workshops">Upcoming Workshops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                    Message / Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can Geet Studio assist you?"
                    className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                      isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {loading ? 'Sending Query...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
