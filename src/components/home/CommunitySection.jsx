import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const communityCategories = [
  'Artists', 'Dancers', 'Anchors', 'Singers', 'DJs', 'Musicians',
  'Event Planners', 'Sound Vendors', 'Light Vendors', 'LED Vendors',
  'Decor Vendors', 'Event Managers', 'Other'
];

const featuredLeads = [
  {
    id: 'lead-1',
    name: 'Aarav Sharma',
    category: 'Dancers',
    profession: 'Bollywood & Choreographer',
    location: 'Indore',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
    experience: '6+ Years',
  },
  {
    id: 'lead-2',
    name: 'Rohan Malhotra',
    category: 'DJs',
    profession: 'EDM & Bollywood DJ',
    location: 'Indore',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    experience: '8+ Years',
  },
  {
    id: 'lead-3',
    name: 'Ananya Verma',
    category: 'Anchors',
    profession: 'Celebrity Host & Emcee',
    location: 'Indore',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80',
    experience: '5+ Years',
  },
  {
    id: 'lead-4',
    name: 'Vikram & Sound Crew',
    category: 'Sound Vendors',
    profession: 'Line Array & Concert Audio',
    location: 'Indore',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80',
    experience: '10+ Years',
  },
];

export default function CommunitySection({ onReachEnd }) {
  const { isDark } = useTheme();
  const bottomRef = useRef(null);
  const isBottomInView = useInView(bottomRef, { margin: '0px 0px -100px 0px', once: false });

  useEffect(() => {
    if (isBottomInView && onReachEnd) {
      onReachEnd();
    }
  }, [isBottomInView, onReachEnd]);

  return (
    <section
      id="community-section"
      className={`py-28 relative overflow-hidden transition-colors border-y ${
        isDark
          ? 'bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 border-gold-500/20 text-warm-50'
          : 'bg-gradient-to-b from-warm-100 via-white to-warm-100 border-gold-500/30 text-dark-950'
      }`}
    >
      {/* Background glowing ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Top Banner Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-500 text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Users className="w-4 h-4" />
            Independent Domain • Opportunities Platform
          </span>
        </motion.div>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            THE GEET <span className="text-gold-500 font-light italic">COMMUNITY</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-editorial text-xl md:text-2xl italic opacity-85"
          >
            "Connecting artists, creators, vendors and event professionals with real opportunities."
          </motion.p>
        </div>

        {/* Category Pills Slider / Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-center text-gold-500 font-semibold mb-6">
            13 Verified Community Categories
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {communityCategories.map((cat, i) => (
              <span
                key={i}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                  isDark
                    ? 'bg-dark-800/90 border-dark-600 hover:border-gold-500 hover:text-gold-500'
                    : 'bg-white border-warm-200 shadow-sm hover:border-gold-500 hover:text-gold-600'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Featured Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredLeads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 ${
                isDark
                  ? 'bg-dark-900 border-dark-700 hover:border-gold-500/60 shadow-lg'
                  : 'bg-white border-warm-200 hover:border-gold-500/60 shadow-md'
              }`}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={lead.image}
                  alt={lead.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold bg-gold-500 text-dark-950 rounded uppercase tracking-wider">
                  {lead.category}
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-heading text-lg font-bold">{lead.name}</h4>
                    <p className="text-xs text-gold-400 font-medium">{lead.profession}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs opacity-75">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  <span>Verified Lead</span>
                </div>
                <span className="text-xs font-semibold text-gold-500">
                  {lead.experience}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Big Impact CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 text-center"
        >
          <Link
            to="/community"
            className="w-full sm:w-auto px-8 py-4 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-400 transition-all shadow-xl hover:shadow-gold-500/20 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Explore Community Directory
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 border border-gold-500 text-gold-500 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2"
          >
            Join as a Community Lead
          </Link>
        </motion.div>
        <div ref={bottomRef} className="h-1 w-full" />
      </div>
    </section>
  );
}
