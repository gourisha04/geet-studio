import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, Globe, ArrowLeft, Send, CheckCircle2, Award, Mail, Phone, Home, X } from 'lucide-react';
import { Instagram } from '../components/icons/Instagram';
import { Youtube } from '../components/icons/Youtube';
import { useTheme } from '../context/ThemeContext';
import { api } from '../utils/api';

const seedLeadsMap = {
  'lead-1': {
    id: 'lead-1',
    name: 'Aarav Sharma',
    category: 'Dancers',
    profession: 'Bollywood & Freestyle Choreographer',
    location: 'Indore, Madhya Pradesh',
    bio: 'Professional dancer and master choreographer based in Indore with over 6 years of experience training students, choreographing grand sangeets, corporate events, and music videos across Central India.',
    services: ['Sangeet Choreography', 'Solo Dance Acts', 'Dance Workshops', 'Competition Judging', 'Music Video Choreography'],
    experience: '6+ Years Experience',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    instagram: 'https://instagram.com/aarav_dance',
    youtube: 'https://youtube.com',
    email: 'aarav.dance@gmail.com',
    phone: '+91 87704 09447',
    address: 'Geet Studio, Vijay Nagar, Indore, Madhya Pradesh',
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    ],
  },
  'lead-2': {
    id: 'lead-2',
    name: 'DJ Rohan Malhotra',
    category: 'DJs',
    profession: 'EDM, Commercial & Bollywood DJ',
    location: 'Indore, Madhya Pradesh',
    bio: 'High-energy live DJ with 8+ years experience performing at top clubs, celebrity weddings, and college fests in MP.',
    services: ['Club DJing', 'Wedding Sangeet DJ', 'Sound & Console Setup', 'Private Party Sets'],
    experience: '8+ Years Experience',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    instagram: 'https://instagram.com/djrohan',
    youtube: 'https://youtube.com',
    email: 'djrohan@gmail.com',
    phone: '+91 98765 43210',
    address: 'Sapna Sangeeta Road, Indore, MP',
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    ],
  },
};

export default function CommunityDetail() {
  const { id } = useParams();
  const { isDark } = useTheme();
  const [lead, setLead] = useState(() => seedLeadsMap[id] || seedLeadsMap['lead-1']);

  const [contactModal, setContactModal] = useState(false);
  const [contactRevealed, setContactRevealed] = useState(false);
  const [revealedData, setRevealedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    requesterName: '',
    requesterEmail: '',
    requesterPhone: '',
    purpose: 'Hire for Event',
  });

  useEffect(() => {
    let cancelled = false;
    const fetchLead = async () => {
      try {
        const res = await api.get(`/api/community/${id}`);
        if (!cancelled && res?.success && res?.data) {
          setLead((prev) => ({ ...prev, ...res.data }));
        }
      } catch {
        // Fallback to seed data
      }
    };
    fetchLead();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleGetContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const visitorId = localStorage.getItem('geet_visitor_id') || 'v_unknown';
      const sessionId = sessionStorage.getItem('geet_session_id') || 's_unknown';

      const res = await api.post(`/api/community/${id}/reveal-contact`, {
        ...form,
        visitorId,
        sessionId,
      });

      if (res?.success) {
        setRevealedData(res);
        setContactRevealed(true);
      } else {
        throw new Error(res?.message || 'Failed to fetch contact details');
      }
    } catch (err) {
      console.warn('API reveal failed, using fallback:', err.message);
      setRevealedData({
        email: lead.email || 'hello@geetstudio.in',
        phone: lead.phone || '+91 87704 09447',
        address: lead.address || 'Geet Studio, Indore, MP',
      });
      setContactRevealed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`pt-28 pb-24 min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Back Link */}
        <Link
          to="/community"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-gold-500 hover:text-gold-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Community Directory
        </Link>

        {/* Lead Profile Header Card */}
        <div className={`rounded-2xl border p-6 md:p-10 mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center ${
          isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-xl'
        }`}>
          {/* Image */}
          <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
            <img src={lead.image} alt={lead.name} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-gold-500 text-dark-950 rounded uppercase tracking-wider">
              {lead.category}
            </span>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-gold-500 font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Geet Studio Community Lead</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold">{lead.name}</h1>
              <p className="font-editorial text-xl italic text-gold-400 mt-1">{lead.profession}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs opacity-80 mt-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  {lead.location}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-gold-500" />
                  {lead.experience}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-gold-500 mb-2">About & Bio</h3>
              <p className="text-sm opacity-85 leading-relaxed">{lead.bio}</p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-gold-500 mb-3">Offered Services</h3>
              <div className="flex flex-wrap gap-2">
                {lead.services.map((srv, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      isDark ? 'bg-dark-800 border-dark-700 text-gold-400' : 'bg-warm-100 border-warm-200 text-dark-900'
                    }`}
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Social & CTA */}
            <div className="pt-6 border-t border-dark-700/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {lead.instagram && (
                  <a href={lead.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-dark-950 transition-all">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {lead.youtube && (
                  <a href={lead.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 hover:bg-gold-500 hover:text-dark-950 transition-all">
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setContactModal(true)}
                className="px-8 py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold-400 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Get Contact Details
              </button>
            </div>
          </div>
        </div>

        {/* Work Portfolio Section — Max 4 Photos & 1 Video */}
        {((lead.portfolioPhotos && lead.portfolioPhotos.length > 0) || lead.portfolioVideo) && (
          <div className="space-y-8">
            <h3 className="font-heading text-2xl font-bold">
              Featured <span className="text-gold-500 font-light italic">Work & Showcase</span>
            </h3>

            {/* Work Video */}
            {lead.portfolioVideo && (
              <div className="rounded-2xl overflow-hidden border border-gold-500/30 bg-dark-900 shadow-xl p-4">
                <p className="text-xs uppercase tracking-wider text-gold-500 font-semibold mb-3">Featured Video Work</p>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                  {lead.portfolioVideo.includes('youtube.com') || lead.portfolioVideo.includes('youtu.be') ? (
                    <iframe
                      src={lead.portfolioVideo.replace('watch?v=', 'embed/')}
                      title="Work Video Showcase"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <video src={lead.portfolioVideo} controls className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            )}

            {/* Work Photos (Max 4) */}
            {lead.portfolioPhotos && lead.portfolioPhotos.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-gold-500 font-semibold mb-3">Photo Showcase (Max 4)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {lead.portfolioPhotos.slice(0, 4).map((photo, i) => (
                    <div key={i} className="h-60 rounded-xl overflow-hidden border border-dark-700 shadow-md">
                      <img src={typeof photo === 'string' ? photo : photo.url} alt={`Work ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Details Modal */}
      {contactModal && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md" onClick={() => { setContactModal(false); setContactRevealed(false); }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative w-full max-w-lg rounded-2xl border p-6 md:p-8 ${
              isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-white border-warm-200 text-dark-950'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => { setContactModal(false); setContactRevealed(false); }} className="absolute top-4 right-4 text-gold-500 text-lg font-bold cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            {contactRevealed ? (
              <div className="py-4">
                <div className="text-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-heading text-2xl font-bold mb-1">Contact Details</h3>
                  <p className="text-sm opacity-70">Here are the contact details for <strong className="text-gold-500">{lead.name}</strong></p>
                </div>

                <div className={`space-y-4 p-5 rounded-xl border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-200'}`}>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-gold-500 mb-0.5">Email</p>
                      <a href={`mailto:${revealedData?.email || lead.email}`} className="text-sm hover:text-gold-500 transition-colors">{revealedData?.email || lead.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-gold-500 mb-0.5">Phone</p>
                      <a href={`tel:${revealedData?.phone || lead.phone}`} className="text-sm hover:text-gold-500 transition-colors">{revealedData?.phone || lead.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-gold-500 mb-0.5">Address</p>
                      <p className="text-sm">{revealedData?.address || lead.address}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { setContactModal(false); setContactRevealed(false); }}
                  className="w-full mt-6 py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleGetContact} className="space-y-4">
                <div>
                  <p className="text-xs uppercase text-gold-500 font-semibold tracking-wider">Get Contact Details</p>
                  <h3 className="font-heading text-2xl font-bold">{lead.name}</h3>
                  <p className="text-sm opacity-70 mt-1">Fill in your details to view {lead.name}'s contact information.</p>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.requesterName}
                    onChange={(e) => setForm({ ...form, requesterName: e.target.value })}
                    placeholder="Enter your name"
                    className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.requesterEmail}
                      onChange={(e) => setForm({ ...form, requesterEmail: e.target.value })}
                      placeholder="email@example.com"
                      className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={form.requesterPhone}
                      onChange={(e) => setForm({ ...form, requesterPhone: e.target.value })}
                      placeholder="10-digit number"
                      className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Purpose *</label>
                  <select
                    value={form.purpose}
                    onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                    className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                  >
                    <option value="Hire for Event">Hire for Event</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Business Inquiry">Business Inquiry</option>
                    <option value="General Query">General Query</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  {loading ? 'Verifying...' : 'View Contact Details'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
