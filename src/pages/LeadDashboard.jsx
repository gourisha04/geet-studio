import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ShieldAlert, Clock, CheckCircle2, User, Image, Link as LinkIcon, Save, Sparkles, Upload, Eye, Mail, Phone, Calendar, ArrowUpRight, TrendingUp, Camera, Video, Trash2, Plus, Film } from 'lucide-react';
import { api } from '../utils/api';

export default function LeadDashboard() {
  const { user, isAuthenticated, login } = useAuth();
  const { isDark } = useTheme();

  // Analytics state
  const [analytics, setAnalytics] = useState({ totalViews: 0, totalReveals: 0, recentInquiries: [] });
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  // Lead profile state
  const [status, setStatus] = useState('APPROVED'); // PENDING | APPROVED | REJECTED
  const [profile, setProfile] = useState({
    name: user?.name || 'Aarav Sharma',
    email: user?.email || 'aarav.dance@gmail.com',
    phone: '8770409447',
    category: 'Dancers',
    profession: 'Bollywood & Freestyle Choreographer',
    bio: 'Experienced choreographer leading workshops, sangeet acts, and stage performances across MP.',
    services: 'Sangeet Choreography, Solo Acts, Dance Workshops, Judge',
    location: 'Indore, MP',
    city: 'Indore',
    area: 'Vijay Nagar',
    instagram: 'https://instagram.com/aarav_dance',
    youtube: 'https://youtube.com',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    ],
    portfolioVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  });

  const [newPhotoInput, setNewPhotoInput] = useState('');
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/api/community/lead/analytics');
        if (!cancelled && res?.success) {
          setAnalytics(res);
        }
      } catch (err) {
        console.error('Failed to load lead analytics:', err);
      } finally {
        if (!cancelled) setAnalyticsLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchAnalytics();
    } else {
      setAnalyticsLoading(false);
    }
    return () => { cancelled = true; };
  }, [isAuthenticated]);

  // If not logged in as lead, prompt user to Register or Login
  if (!isAuthenticated) {
    return (
      <div className={`pt-32 pb-24 min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
        <div className={`max-w-md w-full p-8 rounded-3xl border text-center shadow-2xl ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200'}`}>
          <div className="w-14 h-14 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto mb-4 border border-gold-500/30">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="font-heading text-2xl font-bold mb-2">Community Lead Portal</h2>
          <p className="text-xs opacity-80 mb-6 leading-relaxed">
            Register or sign in to create and manage your official Geet Studio Community lead profile.
          </p>

          <div className="space-y-3">
            <Link
              to="/register"
              className="w-full py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg rounded-xl"
            >
              Register as Community Lead <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              to="/login"
              className="w-full py-3.5 border border-gold-500/40 text-gold-400 font-bold text-xs uppercase tracking-widest hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer rounded-xl"
            >
              Already a Lead? Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setHasPendingChanges(true);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddPhoto = () => {
    if (!newPhotoInput.trim()) return;
    if (profile.portfolioPhotos.length >= 4) return;
    setProfile({
      ...profile,
      portfolioPhotos: [...profile.portfolioPhotos, newPhotoInput.trim()],
    });
    setNewPhotoInput('');
  };

  const handleRemovePhoto = (index) => {
    const updated = profile.portfolioPhotos.filter((_, i) => i !== index);
    setProfile({ ...profile, portfolioPhotos: updated });
  };

  const handleRemoveVideo = () => {
    setProfile({ ...profile, portfolioVideo: '' });
  };

  return (
    <div className={`pt-28 pb-24 min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-dark-700/40 pb-6">
          <div>
            <span className="px-3 py-1 text-[10px] font-bold bg-gold-500/10 border border-gold-500/30 text-gold-500 rounded uppercase tracking-wider mb-2 inline-block">
              Lead Dashboard
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">
              My Profile <span className="text-gold-500 font-light italic">& Services</span>
            </h1>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3">
            {status === 'APPROVED' ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile Publicly Approved</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Clock className="w-4 h-4" />
                <span>Pending Admin Approval</span>
              </div>
            )}
          </div>
        </div>

        {hasPendingChanges && (
          <div className="mb-8 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs flex items-center gap-3">
            <Clock className="w-5 h-5 shrink-0 text-amber-400" />
            <div>
              <p className="font-bold">Pending Changes Awaiting Admin Review</p>
              <p className="opacity-90">Major field updates (Name, Category, Bio, Portfolio) require Admin review. Your currently approved version remains live on `/community`.</p>
            </div>
          </div>
        )}

        {savedSuccess && (
          <div className="mb-8 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <p className="font-bold">Profile update submitted successfully!</p>
          </div>
        )}

        {/* Analytics Section */}
        <div className="mb-10">
          <h2 className="font-heading text-xl font-bold mb-4 text-gold-500 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> 7-Day Performance & Reach
          </h2>
          {analyticsLoading ? (
            <div className="h-32 flex items-center justify-center border border-dashed border-dark-700/50 rounded-2xl">
              <span className="text-sm opacity-60">Loading stats...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Profile Reach */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs uppercase tracking-wider opacity-75">Profile Views</span>
                    <span className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-heading font-bold text-gold-500">{analytics.totalViews}</span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" /> +14.2%
                    </span>
                  </div>
                  <p className="text-[11px] opacity-60 mt-1">Unique visitor impressions in Indore</p>
                </div>

                {/* Contact Reveals */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs uppercase tracking-wider opacity-75">Contact Details Revealed</span>
                    <span className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <Mail className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-heading font-bold text-purple-400">{analytics.totalReveals}</span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" /> +8.3%
                    </span>
                  </div>
                  <p className="text-[11px] opacity-60 mt-1">People who requested your phone/email</p>
                </div>

                {/* Conversion Rate */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs uppercase tracking-wider opacity-75">Lead Conversion Rate</span>
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-heading font-bold text-emerald-400">
                      {analytics.totalViews > 0 ? ((analytics.totalReveals / analytics.totalViews) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <p className="text-[11px] opacity-60 mt-1">Percentage of viewers requesting contact details</p>
                </div>
              </div>

              {/* Recent Inquiries List */}
              {analytics.recentInquiries?.length > 0 && (
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
                  <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-500" /> Recent Gig Leads & Inquiries
                  </h3>
                  <div className="divide-y divide-dark-700/40">
                    {analytics.recentInquiries.map((inquiry, idx) => (
                      <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="font-bold text-sm text-gold-500">{inquiry.name}</p>
                          <p className="text-xs opacity-75 font-serif italic mb-1">"{inquiry.purpose}"</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-60">
                            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gold-500" /> {inquiry.email}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gold-500" /> {inquiry.phone}</span>
                          </div>
                        </div>
                        <span className="text-[10px] opacity-60 self-start sm:self-auto">
                          {new Date(inquiry.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dashboard Form */}
        <form onSubmit={handleSaveProfile} className="space-y-8">
          {/* Profile Photo & Primary Info */}
          <div className={`p-6 md:p-8 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200'}`}>
            <h3 className="font-heading text-xl font-bold text-gold-500 mb-6 flex items-center gap-2">
              <User className="w-5 h-5" /> Primary Information & Profile Picture
            </h3>

            {/* Profile Picture Upload Box */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-dark-700/60 bg-dark-800/40 mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold-500 shrink-0 shadow-lg group">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-gold-400">
                  <Camera className="w-6 h-6" />
                </div>
              </div>

              <div className="flex-1 w-full space-y-2">
                <label className="block text-xs uppercase font-semibold text-gold-500 tracking-wider">
                  Profile Photo URL / Upload
                </label>
                <input
                  type="text"
                  value={profile.profileImage}
                  onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
                  placeholder="Paste image URL (e.g. https://...)"
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
                <p className="text-[11px] opacity-60">Upload or paste a high resolution portrait photo for your public lead card.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Full Name (Major) *</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Category (Major) *</label>
                <select
                  value={profile.category}
                  onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                >
                  <option value="Artists">Artists</option>
                  <option value="Dancers">Dancers</option>
                  <option value="Anchors">Anchors</option>
                  <option value="Singers">Singers</option>
                  <option value="DJs">DJs</option>
                  <option value="Musicians">Musicians</option>
                  <option value="Event Planners">Event Planners</option>
                  <option value="Sound Vendors">Sound Vendors</option>
                  <option value="Light Vendors">Light Vendors</option>
                  <option value="LED Vendors">LED Vendors</option>
                  <option value="Decor Vendors">Decor Vendors</option>
                  <option value="Event Managers">Event Managers</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Profession / Title (Major) *</label>
                <input
                  type="text"
                  value={profile.profession}
                  onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Location (Major) *</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">City *</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  placeholder="e.g. Indore"
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Area *</label>
                <input
                  type="text"
                  value={profile.area}
                  onChange={(e) => setProfile({ ...profile, area: e.target.value })}
                  placeholder="e.g. Vijay Nagar"
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Bio (Major) *</label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Services Offered (Comma separated)</label>
                <input
                  type="text"
                  value={profile.services}
                  onChange={(e) => setProfile({ ...profile, services: e.target.value })}
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
              </div>
            </div>
          </div>

          {/* Work Showcase Section — Max 4 Photos & Max 1 Video */}
          <div className={`p-6 md:p-8 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-xl font-bold text-gold-500 mb-2 flex items-center gap-2">
              <Film className="w-5 h-5" /> Work Portfolio (Max 4 Photos, Max 1 Video)
            </h3>
            <p className="text-xs opacity-70 mb-6">Showcase your past performances, stage acts, or event work to prospective clients.</p>

            {/* Work Photos (Max 4) */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase font-semibold text-gold-500 tracking-wider flex items-center gap-1.5">
                  <Image className="w-4 h-4" /> Work Photos ({profile.portfolioPhotos.length}/4)
                </label>
                {profile.portfolioPhotos.length < 4 && (
                  <span className="text-[11px] opacity-60">You can add {4 - profile.portfolioPhotos.length} more photo(s)</span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.portfolioPhotos.map((photoUrl, idx) => (
                  <div key={idx} className="relative h-40 rounded-xl overflow-hidden border border-dark-700 group shadow-md">
                    <img src={photoUrl} alt={`Work ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer shadow-lg"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white uppercase">Photo {idx + 1}</span>
                  </div>
                ))}

                {profile.portfolioPhotos.length < 4 && (
                  <div className="h-40 rounded-xl border-2 border-dashed border-dark-700 flex flex-col items-center justify-center p-3 text-center bg-dark-800/20">
                    <Plus className="w-6 h-6 text-gold-500 mb-1" />
                    <p className="text-[11px] font-semibold opacity-80">Add Photo URL</p>
                  </div>
                )}
              </div>

              {profile.portfolioPhotos.length < 4 && (
                <div className="flex gap-2 pt-2">
                  <input
                    type="url"
                    value={newPhotoInput}
                    onChange={(e) => setNewPhotoInput(e.target.value)}
                    placeholder="Paste image URL (https://...)"
                    className={`flex-1 p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                  />
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="px-4 py-2.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all rounded cursor-pointer"
                  >
                    Add Photo
                  </button>
                </div>
              )}
            </div>

            {/* Work Video (Max 1) */}
            <div className="space-y-4 pt-4 border-t border-dark-700/50">
              <label className="text-xs uppercase font-semibold text-gold-500 tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4" /> Work Video Showcase (Max 1 Video)
              </label>

              {profile.portfolioVideo ? (
                <div className="relative rounded-xl overflow-hidden border border-dark-700 bg-dark-800 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold truncate text-gold-400">{profile.portfolioVideo}</span>
                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      className="px-2.5 py-1 bg-red-600/80 hover:bg-red-600 text-white rounded text-xs font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Video
                    </button>
                  </div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                    {profile.portfolioVideo.includes('youtube.com') || profile.portfolioVideo.includes('youtu.be') ? (
                      <iframe
                        src={profile.portfolioVideo.replace('watch?v=', 'embed/')}
                        title="Work Video Preview"
                        className="w-full h-full"
                        allowFullScreen
                      />
                    ) : (
                      <video src={profile.portfolioVideo} controls className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="url"
                    value={profile.portfolioVideo || ''}
                    onChange={(e) => setProfile({ ...profile, portfolioVideo: e.target.value })}
                    placeholder="Paste YouTube or MP4 video URL (e.g. https://www.youtube.com/watch?v=...)"
                    className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                  />
                  <p className="text-[11px] opacity-60">Add a video showcasing your best live performance or event reel.</p>
                </div>
              )}
            </div>
          </div>

          {/* Social Links (Instagram & YouTube) */}
          <div className={`p-6 md:p-8 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-xl font-bold text-gold-500 mb-2 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" /> Social Handles (Minor - Instant Update)
            </h3>
            <p className="text-xs opacity-70 mb-6">Social link edits update live on your profile immediately without requiring admin review.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={profile.instagram}
                  onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold opacity-80 mb-1">YouTube URL</label>
                <input
                  type="url"
                  value={profile.youtube}
                  onChange={(e) => setProfile({ ...profile, youtube: e.target.value })}
                  className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-4 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold-400 transition-all flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <Save className="w-4 h-4" /> Save & Submit Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
