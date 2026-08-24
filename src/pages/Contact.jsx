import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Instagram } from '../components/icons/Instagram';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <PageTransition>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Get in Touch"
            subtitle="We'd love to hear from you. Reach out and let's create something beautiful."
          />
        </div>
      </section>

      <section className="pb-20 md:pb-32 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl font-bold text-warm-50 mb-6">Geet Studio</h2>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-dark-800 border border-dark-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-dark-300 mb-1">Location</p>
                  <p className="text-sm text-warm-50">Vijay Nagar, Indore</p>
                  <p className="text-sm text-dark-200">Madhya Pradesh, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-dark-800 border border-dark-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-dark-300 mb-1">Phone</p>
                  <p className="text-sm text-warm-50">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-dark-800 border border-dark-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-dark-300 mb-1">Email</p>
                  <p className="text-sm text-warm-50">hello@geetstudio.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-dark-800 border border-dark-600 flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-4 h-4 text-gold-500" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-dark-300 mb-1">Instagram</p>
                  <a href="https://www.instagram.com/the_geetstudio?igsh=YWE4cWVyNXM4OTFu" target="_blank" rel="noopener noreferrer" className="text-sm text-gold-500 hover:text-gold-400 transition-colors">
                    @the_geetstudio
                  </a>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-video bg-dark-800 border border-dark-600 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-dark-400 mx-auto mb-2" />
                <p className="text-xs text-dark-400 uppercase tracking-wider">Map Placeholder</p>
                <p className="text-xs text-dark-300 mt-1">Vijay Nagar, Indore, MP</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl font-bold text-warm-50 mb-6">Send a Message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-800 border border-dark-600 p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center">
                  <Send className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-heading text-xl font-bold text-warm-50 mb-2">Message Sent!</h3>
                <p className="text-sm text-dark-200 mb-4">Thank you for reaching out. We'll get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-gold-500 hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-dark-800 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gold-500 text-dark-900 text-sm uppercase tracking-widest font-semibold hover:bg-gold-400 transition-all duration-300 cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
