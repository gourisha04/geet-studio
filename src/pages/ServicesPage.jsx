import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Music, Flame, Trophy, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const servicesData = [
  {
    id: 'dance',
    title: 'Dance',
    category: 'Primary Service',
    description: 'Our core specialty. Expert training across traditional, urban, and modern dance forms in Indore.',
    offerings: [
      { name: 'Bollywood', desc: 'High-energy cinematic dance routines for all age groups.' },
      { name: 'Hip-Hop', desc: 'Urban street dance, popping, locking, and choreography.' },
      { name: 'Contemporary', desc: 'Fluid movement, emotional expression, and floorwork techniques.' },
      { name: 'Freestyle', desc: 'Improvised movement, rhythm adaptation, and battle training.' },
      { name: 'Salsa', desc: 'Latin partner dance styling, footwork, and partner connection.' }
    ],
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
  },
  {
    id: 'music',
    title: 'Music',
    category: 'Vocal & Instrumental',
    description: 'Comprehensive music education covering vocal modulation, instruments, and stage performance.',
    offerings: [
      { name: 'Vocal Training', desc: 'Classical Hindustani & Western vocal warm-ups, pitch and breath control.' },
      { name: 'Acoustic Guitar', desc: 'Chords, strumming patterns, and song accompaniment.' },
      { name: 'Keyboard & Piano', desc: 'Sight reading, scales, chords, and keyboard arrangement.' }
    ],
    icon: Music,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  },
  {
    id: 'fitness',
    title: 'Fitness',
    category: 'Health & Conditioning',
    description: 'Transformative workout sessions combining dance rhythms with cardiovascular endurance.',
    offerings: [
      { name: 'Zumba Fitness', desc: 'Latin and international dance-fitness workout.' },
      { name: 'Dance Aerobics', desc: 'Rhythmic aerobic exercise for stamina and weight loss.' },
      { name: 'Body Conditioning', desc: 'Core strengthening, flexibility stretching, and posture correction.' }
    ],
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
  },
  {
    id: 'events-productions',
    title: 'Events & Productions',
    category: 'Shows & Choreography',
    description: 'End-to-end choreography and stage management for corporate events, weddings, and production shows.',
    offerings: [
      { name: 'Wedding Choreography', desc: 'Sangeet, couple dance, family entries, and flash mobs.' },
      { name: 'Corporate Events', desc: 'Team choreography, annual day show production, and stage acts.' },
      { name: 'Stage Shows', desc: 'Professional dance troupe performances and concept productions.' }
    ],
    icon: Trophy,
    isQuoteRequired: true,
    image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=800&q=80',
  },
];

export default function ServicesPage() {
  const { isDark } = useTheme();
  const [quoteModal, setQuoteModal] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '', email: '', phone: '', eventType: 'Wedding Choreography', eventDate: '', guests: '', budget: '', message: ''
  });

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setQuoteSent(true);
  };

  return (
    <div className={`pt-28 pb-24 min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-3">
            What We Do
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Our Studio <span className="text-gold-500 font-light italic">Services</span>
          </h1>
          <p className="font-editorial text-xl italic opacity-85">
            Geet Studio offers specialized services across four primary artistic domains. (Note: Community is located under its own top-level domain).
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`rounded-2xl overflow-hidden border grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 lg:p-10 ${
                  isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-lg'
                }`}
              >
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} relative h-72 lg:h-96 rounded-xl overflow-hidden`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/20 backdrop-blur-md flex items-center justify-center text-gold-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold">{service.title}</h3>
                  </div>
                </div>

                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                  <div>
                    <span className="px-3 py-1 text-xs font-bold bg-gold-500/10 border border-gold-500/30 text-gold-500 rounded uppercase tracking-wider inline-block mb-3">
                      {service.category}
                    </span>
                    <h2 className="font-heading text-3xl font-bold mb-3">{service.title}</h2>
                    <p className="text-base opacity-85 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-gold-500">
                      Current Offerings & Disciplines:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.offerings.map((off, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg border text-xs ${
                            isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-100 border-warm-200'
                          }`}
                        >
                          <p className="font-bold text-gold-500 mb-0.5">{off.name}</p>
                          <p className="opacity-75">{off.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      to={`/classes`}
                      className="px-6 py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all flex items-center gap-2"
                    >
                      Explore Related Classes
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {service.isQuoteRequired && (
                      <button
                        onClick={() => setQuoteModal(true)}
                        className="px-6 py-3 border border-gold-500 text-gold-500 font-bold text-xs uppercase tracking-wider hover:bg-gold-500/10 transition-all cursor-pointer"
                      >
                        Request a Quote
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quote Request Modal */}
      {quoteModal && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md" onClick={() => setQuoteModal(false)}>
          <div className={`relative w-full max-w-lg rounded-xl border p-6 md:p-8 ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200'}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setQuoteModal(false)} className="absolute top-4 right-4 text-gold-500">✕</button>
            {quoteSent ? (
              <div className="text-center py-6">
                <h3 className="text-2xl font-bold text-gold-500 mb-2">Quote Request Sent!</h3>
                <p className="text-sm opacity-80 mb-4">Our events team will contact you with custom packages shortly.</p>
                <button onClick={() => { setQuoteSent(false); setQuoteModal(false); }} className="px-6 py-2 bg-gold-500 text-dark-950 text-xs font-bold uppercase">Close</button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <h3 className="font-heading text-2xl font-bold text-gold-500">Events & Production Quote</h3>
                <div>
                  <label className="block text-xs uppercase font-semibold mb-1">Your Name *</label>
                  <input type="text" required value={quoteForm.name} onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-semibold mb-1">Email *</label>
                    <input type="email" required value={quoteForm.email} onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold mb-1">Phone *</label>
                    <input type="tel" required value={quoteForm.phone} onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold mb-1">Event Type *</label>
                  <select value={quoteForm.eventType} onChange={(e) => setQuoteForm({...quoteForm, eventType: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}>
                    <option value="Wedding Choreography">Wedding Choreography</option>
                    <option value="Corporate Show">Corporate Show</option>
                    <option value="Stage Performance">Stage Performance</option>
                    <option value="Other Production">Other Production</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold mb-1">Message / Requirements</label>
                  <textarea rows={3} value={quoteForm.message} onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                </div>
                <button type="submit" className="w-full py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Quote Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
