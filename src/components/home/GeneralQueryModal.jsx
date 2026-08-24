import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function GeneralQueryModal({ isOpen, onClose, initialCategory = 'General' }) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: initialCategory,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send query payload to backend endpoint /api/queries
      await new Promise((res) => setTimeout(res, 800)); // Simulating fast API call
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[220] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-dark-950/85 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-lg rounded-xl overflow-hidden border shadow-2xl p-6 md:p-8 ${
            isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-white border-warm-200 text-dark-950'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gold-500/10 text-gold-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
              <h3 className="font-heading text-2xl font-bold mb-2">Query Received!</h3>
              <p className="text-sm opacity-80 mb-6">
                Thank you for reaching out to Geet Studio. Our team in Indore will get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-gold-500 text-dark-950 text-xs uppercase font-bold tracking-widest hover:bg-gold-400 transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-1">
                  Have a Question?
                </p>
                <h3 className="font-heading text-2xl md:text-3xl font-bold">
                  DO YOU HAVE ANY <span className="text-gold-500">QUERY?</span>
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                      isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                        isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
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
                      placeholder="10-digit number"
                      className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                        isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                      isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  >
                    <option value="General">General Inquiry</option>
                    <option value="Dance">Dance Service</option>
                    <option value="Music">Music Service</option>
                    <option value="Fitness">Fitness Service</option>
                    <option value="Events & Productions">Events & Productions</option>
                    <option value="Community">Community & Lead Hire</option>
                    <option value="Classes">Classes & Admissions</option>
                    <option value="Workshops">Workshops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are looking for..."
                    className={`w-full px-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                      isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
