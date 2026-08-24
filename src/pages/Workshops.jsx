import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter, Award, Video, MessageSquare, Coffee, CheckCircle, Send, X, Calendar, Clock, MapPin, Search } from 'lucide-react';
import WorkshopCard from '../components/cards/WorkshopCard';
import PageTransition from '../components/ui/PageTransition';
import { workshops } from '../data/workshops';
import { useTheme } from '../context/ThemeContext';

const filterCategories = ['All', 'Bollywood', 'Hip-Hop', 'Contemporary', 'Salsa'];

export default function Workshops() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Registration modal state
  const [activeWorkshop, setActiveWorkshop] = useState(null);
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '', note: '' });
  const [regSuccess, setRegSuccess] = useState(false);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter((w) => {
      const matchesCat = selectedCategory === 'All' || w.style.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) || w.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredWorkshop = workshops[0];

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegSuccess(true);
  };

  return (
    <PageTransition>
      <div className={`min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
        
        {/* 1. Hero Header */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950 border-b border-dark-800">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 font-bold text-xs uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4" /> Intensive Bootcamps & Masterclasses
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 tracking-tight text-warm-50">
                Elevate Your Craft With <span className="text-gold-500 font-light italic">Master Workshops</span>
              </h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base opacity-80 leading-relaxed mb-8">
                Immerse yourself in specialized 3 to 8 hour intensive bootcamps led by industry-leading choreographers and master artists in Indore.
              </p>

              {/* Stat Pills */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gold-400">
                <span className="px-3.5 py-1.5 rounded-xl bg-dark-900 border border-dark-700">🔥 {workshops.length} Active Masterclasses</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-dark-900 border border-dark-700">📜 Verified Certificates</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-dark-900 border border-dark-700">🎟️ Limited Batch Sizes</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Spotlight Featured Workshop */}
        {featuredWorkshop && (
          <section className="py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-gold-500 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Spotlight Featured Masterclass
              </div>
              <WorkshopCard
                workshop={featuredWorkshop}
                featured={true}
                onQuickRegister={(w) => { setActiveWorkshop(w); setRegSuccess(false); }}
              />
            </div>
          </section>
        )}

        {/* 3. Filters & Workshop Grid */}
        <section className="py-12 pb-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* Filter Bar & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-dark-800 bg-dark-900/60 backdrop-blur-md">
              
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs uppercase font-bold text-gold-500 mr-2 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-gold-500 text-dark-950 shadow-md'
                        : 'bg-dark-800 text-dark-200 hover:text-warm-50 hover:bg-dark-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-gold-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search workshops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-dark-950 border border-dark-700 text-warm-50 focus:border-gold-500 outline-none"
                />
              </div>
            </div>

            {/* Grid */}
            {filteredWorkshops.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-dark-700 rounded-3xl">
                <p className="text-lg font-bold opacity-80 mb-2">No workshops found</p>
                <p className="text-xs opacity-60">Try clearing your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWorkshops.map((ws) => (
                  <WorkshopCard
                    key={ws.id}
                    workshop={ws}
                    onQuickRegister={(w) => { setActiveWorkshop(w); setRegSuccess(false); }}
                  />
                ))}
              </div>
            )}

            {/* 4. Why Attend Workshops Section */}
            <div className="pt-16 border-t border-dark-800">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-gold-500 mb-2">Workshop Advantage</p>
                <h3 className="font-heading text-3xl font-bold">Why Attend A <span className="text-gold-500">Geet Studio</span> Intensive?</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl border border-dark-800 bg-dark-900/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-warm-50">Official Certificate</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Every participant receives a signed studio certificate of completion for portfolio building.</p>
                </div>

                <div className="p-6 rounded-2xl border border-dark-800 bg-dark-900/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto">
                    <Video className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-warm-50">HD Recording Video</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Full 4K performance video of the final choreography shoot delivered to every student.</p>
                </div>

                <div className="p-6 rounded-2xl border border-dark-800 bg-dark-900/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-warm-50">1-on-1 Feedback</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Personalized musicality correction and technique feedback from guest master faculty.</p>
                </div>

                <div className="p-6 rounded-2xl border border-dark-800 bg-dark-900/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-warm-50">Artist Lounge & Snacks</h4>
                  <p className="text-xs opacity-75 leading-relaxed">Complimentary refreshments and open networking sessions with fellow dancers.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. Quick Registration Modal */}
        <AnimatePresence>
          {activeWorkshop && (
            <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md" onClick={() => setActiveWorkshop(null)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative w-full max-w-md rounded-3xl border p-6 md:p-8 shadow-2xl ${
                  isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-white border-warm-200 text-dark-950'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setActiveWorkshop(null)} className="absolute top-4 right-4 text-gold-500 hover:text-gold-400 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>

                {regSuccess ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-gold-500 mb-2">Registration Received!</h3>
                    <p className="text-sm opacity-80 mb-6">Our workshop manager will contact you with seat booking details.</p>
                    <button onClick={() => setActiveWorkshop(null)} className="px-6 py-2.5 bg-gold-500 text-dark-950 text-xs font-bold uppercase cursor-pointer rounded-xl">Close</button>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-gold-500 tracking-wider">Registering For Intensive</span>
                      <h3 className="font-heading text-xl font-bold text-gold-500">{activeWorkshop.name}</h3>
                      <p className="text-xs opacity-70">₹{activeWorkshop.price} • {activeWorkshop.date}</p>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold mb-1">Your Full Name *</label>
                      <input type="text" required value={regForm.name} onChange={(e) => setRegForm({ ...regForm, name: e.target.value })} className={`w-full p-2.5 text-sm rounded-xl border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold mb-1">Email Address *</label>
                      <input type="email" required value={regForm.email} onChange={(e) => setRegForm({ ...regForm, email: e.target.value })} className={`w-full p-2.5 text-sm rounded-xl border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold mb-1">Phone Number *</label>
                      <input type="tel" required value={regForm.phone} onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })} className={`w-full p-2.5 text-sm rounded-xl border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg rounded-xl">
                      <Send className="w-4 h-4" /> Submit Enrollment Interest
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
