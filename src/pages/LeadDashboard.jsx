import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  ShieldAlert, Clock, CheckCircle2, User, Image as ImageIcon, Link as LinkIcon, Save,
  Sparkles, Upload, Eye, Mail, Phone, Calendar, ArrowUpRight, TrendingUp,
  Camera, Video, Trash2, Plus, Film, X, Check, MapPin, Award
} from 'lucide-react';
import { api } from '../utils/api';

const categories = [
  'Artists', 'Dancers', 'Anchors', 'Singers', 'DJs', 'Musicians',
  'Event Planners', 'Sound Vendors', 'Light Vendors', 'LED Vendors',
  'Decor Vendors', 'Event Managers', 'Other'
];

export default function LeadDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Gallery Picker Modal State
  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [galleryPickerTarget, setGalleryPickerTarget] = useState('profile'); // 'profile' | 'portfolioPhoto' | 'portfolioVideo'
  const [studioGallery, setStudioGallery] = useState([]);

  // Member Profile State
  const [profile, setProfile] = useState({
    _id: '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    category: 'Dancers',
    profession: 'Choreographer',
    bio: '',
    services: 'Sangeet Choreography, Solo Performance',
    experience: '3+ Years',
    location: 'Indore, MP',
    city: 'Indore',
    area: 'Vijay Nagar',
    instagram: '',
    youtube: '',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
    portfolioPhotos: [],
    portfolioVideos: [],
    status: 'PENDING',
  });

  const [newVideoUrl, setNewVideoUrl] = useState('');

  // Load Member Profile from MongoDB
  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/community/lead/me');
      if (res?.success && res?.data) {
        const d = res.data;
        setProfile({
          _id: d._id || '',
          name: d.name || user?.name || '',
          email: d.email || user?.email || '',
          phone: d.phone || user?.phone || '',
          category: d.category || 'Dancers',
          profession: d.profession || 'Choreographer',
          bio: d.bio || '',
          services: Array.isArray(d.services) ? d.services.join(', ') : (d.services || ''),
          experience: d.experience || '3+ Years',
          location: d.location || 'Indore, MP',
          city: d.city || 'Indore',
          area: d.area || '',
          instagram: d.socialLinks?.instagram || '',
          youtube: d.socialLinks?.youtube || '',
          profileImage: typeof d.profileImage === 'string' ? d.profileImage : (d.profileImage?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80'),
          portfolioPhotos: Array.isArray(d.portfolioPhotos) ? d.portfolioPhotos.map(p => typeof p === 'string' ? p : p.url) : [],
          portfolioVideos: Array.isArray(d.portfolioVideos) ? d.portfolioVideos.map(v => typeof v === 'string' ? v : v.url) : [],
          status: d.status || 'PENDING',
        });
      }
    } catch (err) {
      console.warn('Profile fetch note:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load Studio Gallery for media picker
  const loadGallery = async () => {
    try {
      const res = await api.get('/api/gallery');
      if (res?.success && Array.isArray(res.data)) {
        setStudioGallery(res.data);
      }
    } catch (err) {
      console.warn('Studio gallery fetch error:', err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProfile();
      loadGallery();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className={`pt-32 pb-24 min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
        <div className={`max-w-md w-full p-8 rounded-3xl border text-center shadow-2xl ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200'}`}>
          <div className="w-14 h-14 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto mb-4 border border-gold-500/30">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="font-heading text-2xl font-bold mb-2">Community Member Portal</h2>
          <p className="text-xs opacity-80 mb-6 leading-relaxed">
            Register or sign in to manage your official Geet Studio Community Member profile.
          </p>
          <div className="space-y-3">
            <Link
              to="/register"
              className="w-full py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg rounded-xl"
            >
              Register as Community Member <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="w-full py-3.5 border border-gold-500/40 text-gold-400 font-bold text-xs uppercase tracking-widest hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer rounded-xl"
            >
              Already a Member? Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Profile Save Handler (MongoDB persistence)
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSaveSuccess(false);

    try {
      const res = await api.put('/api/community/lead/me', {
        ...profile,
        services: profile.services.split(',').map(s => s.trim()).filter(Boolean),
        portfolioPhotos: profile.portfolioPhotos,
        portfolioVideos: profile.portfolioVideos,
      });

      if (res?.success && res?.data) {
        const d = res.data;
        setProfile((prev) => ({
          ...prev,
          _id: d._id || prev._id,
          status: d.status || prev.status,
        }));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        throw new Error(res?.message || 'Failed to save profile changes.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error saving profile to database.');
    } finally {
      setSaving(false);
    }
  };

  // Direct File Upload Handler for Profile / Portfolio Photos
  const handleFileUpload = (e, targetType) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      if (targetType === 'profile') {
        setProfile({ ...profile, profileImage: base64Data });
      } else if (targetType === 'portfolioPhoto') {
        setProfile({ ...profile, portfolioPhotos: [...profile.portfolioPhotos, base64Data] });
      }
    };
    reader.readAsDataURL(file);
  };

  // Gallery Picker Selection Handler
  const handleSelectGalleryItem = (mediaUrl) => {
    if (galleryPickerTarget === 'profile') {
      setProfile({ ...profile, profileImage: mediaUrl });
    } else if (galleryPickerTarget === 'portfolioPhoto') {
      setProfile({ ...profile, portfolioPhotos: [...profile.portfolioPhotos, mediaUrl] });
    } else if (galleryPickerTarget === 'portfolioVideo') {
      setProfile({ ...profile, portfolioVideos: [...profile.portfolioVideos, mediaUrl] });
    }
    setShowGalleryPicker(false);
  };

  // Video URL Add Handler
  const handleAddVideoUrl = () => {
    if (!newVideoUrl.trim()) return;
    setProfile({
      ...profile,
      portfolioVideos: [...profile.portfolioVideos, newVideoUrl.trim()],
    });
    setNewVideoUrl('');
  };

  const handleRemovePhoto = (index) => {
    setProfile({
      ...profile,
      portfolioPhotos: profile.portfolioPhotos.filter((_, i) => i !== index),
    });
  };

  const handleRemoveVideo = (index) => {
    setProfile({
      ...profile,
      portfolioVideos: profile.portfolioVideos.filter((_, i) => i !== index),
    });
  };

  return (
    <div className={`pt-28 pb-24 min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header Bar */}
        <div className={`p-6 md:p-8 rounded-3xl border mb-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark ? 'bg-dark-900 border-dark-700 shadow-2xl' : 'bg-white border-warm-200 shadow-xl'
        }`}>
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-gold-500 shadow-lg flex-shrink-0">
              <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                  profile.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                  profile.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  Status: {profile.status}
                </span>
                {profile._id && (
                  <span className="text-[10px] font-mono opacity-60">ID: {profile._id}</span>
                )}
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold">{profile.name || 'Community Member'}</h1>
              <p className="text-xs text-gold-500 font-medium mt-0.5">{profile.profession || 'Artist Profile'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {profile._id && profile.status === 'APPROVED' && (
              <Link
                to={`/community/${profile._id}`}
                target="_blank"
                className="flex-1 md:flex-initial px-4 py-3 border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 text-xs font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" /> View Public Profile
              </Link>
            )}
          </div>
        </div>

        {/* Status Notification Alert */}
        {profile.status === 'PENDING' && (
          <div className="mb-8 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center gap-3 shadow-md">
            <Clock className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">Profile Under Review</p>
              <p className="opacity-90 mt-0.5">Your profile is submitted and currently under review by Geet Studio administration. It will be visible in the public directory once approved.</p>
            </div>
          </div>
        )}

        {saveSuccess && (
          <div className="mb-8 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3 shadow-md">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">Profile Saved Successfully!</p>
              <p className="opacity-90 mt-0.5">Your Community Member profile document has been stored in MongoDB.</p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Spacious Member Profile Editor Form */}
        <form onSubmit={handleSaveProfile} className="space-y-8">
          
          {/* SECTION 1: PROFILE PHOTO (NO URL INPUT!) */}
          <div className={`p-6 md:p-8 rounded-3xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-lg font-bold text-gold-500 mb-2 flex items-center gap-2">
              <Camera className="w-5 h-5" /> Profile Photo
            </h3>
            <p className="text-xs opacity-70 mb-6">Select a high quality photo to represent your profile across Geet Studio community.</p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-gold-500 shadow-xl flex-shrink-0">
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-3 w-full sm:w-auto">
                <label className="px-5 py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-gold-400 transition-all cursor-pointer shadow-md">
                  <Upload className="w-4 h-4" /> Upload Photo From Device
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'profile')}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setGalleryPickerTarget('profile');
                    setShowGalleryPicker(true);
                  }}
                  className="w-full px-5 py-3 border border-gold-500/40 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-gold-500/10 transition-all cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4" /> Select From Studio Gallery
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 2: BASIC INFORMATION */}
          <div className={`p-6 md:p-8 rounded-3xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-lg font-bold text-gold-500 mb-6 flex items-center gap-2">
              <User className="w-5 h-5" /> Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Category *</label>
                <select
                  value={profile.category}
                  onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Profession / Title *</label>
                <input
                  type="text"
                  required
                  value={profile.profession}
                  onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                  placeholder="e.g. Bollywood & Hip Hop Choreographer"
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Experience Level</label>
                <select
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                >
                  <option value="1+ Year">1+ Year Experience</option>
                  <option value="3+ Years">3+ Years Experience</option>
                  <option value="5+ Years">5+ Years Experience</option>
                  <option value="8+ Years">8+ Years Experience</option>
                  <option value="10+ Years">10+ Years Experience</option>
                </select>
              </div>

              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">City</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  placeholder="e.g. Indore"
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Area / Locality</label>
                <input
                  type="text"
                  value={profile.area}
                  onChange={(e) => setProfile({ ...profile, area: e.target.value })}
                  placeholder="e.g. Vijay Nagar"
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: BIO & SERVICES */}
          <div className={`p-6 md:p-8 rounded-3xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-lg font-bold text-gold-500 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> About & Offered Services
            </h3>

            <div className="space-y-6 text-xs">
              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Bio / Professional Summary *</label>
                <textarea
                  required
                  rows="4"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Describe your background, achievements, dance styles, or event specializations..."
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Offered Services (Comma Separated)</label>
                <input
                  type="text"
                  value={profile.services}
                  onChange={(e) => setProfile({ ...profile, services: e.target.value })}
                  placeholder="e.g. Sangeet Choreography, Solo Performance, Workshop Masterclass"
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: PORTFOLIO PHOTOS (MULTIPLE PHOTOS) */}
          <div className={`p-6 md:p-8 rounded-3xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-gold-500 flex items-center gap-2">
                  <Camera className="w-5 h-5" /> Portfolio Photos ({profile.portfolioPhotos.length})
                </h3>
                <p className="text-xs opacity-70">Add photos of your live performances, workshops, and choreography events.</p>
              </div>

              <div className="flex items-center gap-3">
                <label className="px-4 py-2 bg-gold-500/10 border border-gold-500/40 text-gold-400 font-bold text-xs uppercase rounded-xl flex items-center gap-1.5 hover:bg-gold-500 hover:text-dark-950 transition-all cursor-pointer">
                  <Upload className="w-3.5 h-3.5" /> Add Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'portfolioPhoto')}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setGalleryPickerTarget('portfolioPhoto');
                    setShowGalleryPicker(true);
                  }}
                  className="px-4 py-2 border border-dark-600 text-xs font-bold uppercase rounded-xl hover:bg-dark-800 transition-all cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" /> From Studio Gallery
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {profile.portfolioPhotos.length === 0 ? (
                <p className="col-span-full py-8 text-center opacity-60 text-xs">No portfolio photos added yet. Click above to add photos.</p>
              ) : (
                profile.portfolioPhotos.map((photo, idx) => (
                  <div key={idx} className="relative group rounded-2xl overflow-hidden border border-dark-700 bg-dark-800 h-40">
                    <img src={photo} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SECTION 5: PORTFOLIO VIDEOS (MULTIPLE VIDEOS) */}
          <div className={`p-6 md:p-8 rounded-3xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-lg font-bold text-gold-500 mb-2 flex items-center gap-2">
              <Film className="w-5 h-5" /> Portfolio Videos ({profile.portfolioVideos.length})
            </h3>
            <p className="text-xs opacity-70 mb-6">Add YouTube video URLs or studio video links showcasing your choreography.</p>

            <div className="flex gap-3 mb-6">
              <input
                type="url"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                placeholder="Paste YouTube or video URL (https://www.youtube.com/watch?v=...)"
                className={`flex-1 p-3 text-xs rounded-xl border focus:outline-none focus:border-gold-500 ${
                  isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                }`}
              />
              <button
                type="button"
                onClick={handleAddVideoUrl}
                className="px-5 py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gold-400 transition-all cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Video
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.portfolioVideos.length === 0 ? (
                <p className="col-span-full py-6 text-center opacity-60 text-xs">No video links added yet.</p>
              ) : (
                profile.portfolioVideos.map((vid, idx) => (
                  <div key={idx} className="p-3 rounded-2xl border border-dark-700 bg-dark-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Film className="w-5 h-5 text-gold-500 flex-shrink-0" />
                      <p className="text-xs font-mono truncate opacity-90">{vid}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveVideo(idx)}
                      className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SECTION 6: CONTACT & SOCIAL LINKS */}
          <div className={`p-6 md:p-8 rounded-3xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-lg font-bold text-gold-500 mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5" /> Contact Information & Socials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="e.g. 8770409447"
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="e.g. artist@gmail.com"
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">Instagram Profile Link</label>
                <input
                  type="url"
                  value={profile.instagram}
                  onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                  placeholder="https://instagram.com/your_handle"
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-80 uppercase font-semibold mb-2">YouTube Channel Link</label>
                <input
                  type="url"
                  value={profile.youtube}
                  onChange={(e) => setProfile({ ...profile, youtube: e.target.value })}
                  placeholder="https://youtube.com/c/your_channel"
                  className={`w-full p-3.5 rounded-xl border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto px-10 py-4 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-gold-400 transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving to MongoDB...' : 'Save Profile Changes'}
            </button>
          </div>

        </form>

      </div>

      {/* STUDIO GALLERY PICKER MODAL */}
      {showGalleryPicker && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className={`max-w-3xl w-full max-h-[85vh] flex flex-col p-6 rounded-3xl border shadow-2xl ${
            isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-white border-warm-200 text-dark-950'
          }`}>
            <div className="flex items-center justify-between mb-4 border-b border-dark-700/40 pb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-gold-500">Select From Studio Gallery</h3>
                <p className="text-xs opacity-70">Pick a media asset from Geet Studio's official gallery collection.</p>
              </div>
              <button
                onClick={() => setShowGalleryPicker(false)}
                className="p-2 hover:bg-dark-800 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
              {studioGallery.length === 0 ? (
                <p className="col-span-full py-12 text-center opacity-60 text-xs">No gallery media uploaded yet. You can upload media directly using the file picker.</p>
              ) : (
                studioGallery.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => handleSelectGalleryItem(item.mediaUrl)}
                    className="relative group rounded-2xl overflow-hidden border border-dark-700 bg-dark-800 h-36 focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer"
                  >
                    <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="px-3 py-1 bg-gold-500 text-dark-950 font-bold text-[10px] uppercase rounded">Select</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
