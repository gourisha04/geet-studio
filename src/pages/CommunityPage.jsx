import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ShieldCheck, MapPin, ArrowRight, UserPlus, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const categoriesList = [
  'All', 'Artists', 'Dancers', 'Anchors', 'Singers', 'DJs', 'Musicians',
  'Event Planners', 'Sound Vendors', 'Light Vendors', 'LED Vendors',
  'Decor Vendors', 'Event Managers', 'Other'
];

const seedLeads = [
  {
    id: 'lead-1',
    name: 'Aarav Sharma',
    category: 'Dancers',
    profession: 'Bollywood & Freestyle Choreographer',
    location: 'Indore',
    city: 'Indore',
    area: 'Vijay Nagar',
    bio: 'Professional dancer and instructor with 6+ years of experience leading workshops and corporate events across MP.',
    services: ['Sangeet Choreography', 'Solo Acts', 'Workshops', 'Judge'],
    experience: '6+ Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    instagram: 'https://instagram.com',
  },
  {
    id: 'lead-2',
    name: 'DJ Rohan Malhotra',
    category: 'DJs',
    profession: 'EDM, Commercial & Bollywood DJ',
    location: 'Indore',
    city: 'Indore',
    area: 'Sapna Sangeeta',
    bio: 'High energy DJ specializing in club nights, wedding sangeets, and large festival stages.',
    services: ['Club DJing', 'Wedding Sangeet', 'Sound Setup', 'Private Parties'],
    experience: '8+ Years',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    instagram: 'https://instagram.com',
  },
  {
    id: 'lead-3',
    name: 'Ananya Verma',
    category: 'Anchors',
    profession: 'Celebrity Host & Event Emcee',
    location: 'Indore',
    city: 'Indore',
    area: 'Palasia',
    bio: 'Fluent in Hindi & English with 200+ hosted live corporate events, award shows, and grand sangeets.',
    services: ['Corporate Hosting', 'Sangeet Anchor', 'Award Shows', 'Brand Launches'],
    experience: '5+ Years',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80',
    instagram: 'https://instagram.com',
  },
  {
    id: 'lead-4',
    name: 'Vikram Audio & Sound',
    category: 'Sound Vendors',
    profession: 'Concert Line Array & Stage Sound',
    location: 'Bhopal',
    city: 'Bhopal',
    area: 'New Market',
    bio: 'Complete sound rental equipment, JBL/RCF line arrays, digital mixers, and professional sound engineers.',
    services: ['Concert Sound', 'Stage Rigging', 'Wireless Mics', 'DJ Gear Rental'],
    experience: '10+ Years',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    instagram: 'https://instagram.com',
  },
  {
    id: 'lead-5',
    name: 'Kavya Western Vocals',
    category: 'Singers',
    profession: 'Live Acoustic & Fusion Singer',
    location: 'Indore',
    city: 'Indore',
    area: 'Vijay Nagar',
    bio: 'Soulful acoustic vocalist performing classic Bollywood retro, Sufi, and pop fusion.',
    services: ['Live Acoustic Set', 'Sufi Night', 'Cocktail Singer', 'Stage Performance'],
    experience: '4+ Years',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
    instagram: 'https://instagram.com',
  },
  {
    id: 'lead-6',
    name: 'Indore Light Crafters',
    category: 'Light Vendors',
    profession: 'Intelligent Stage & Ambience Lighting',
    location: 'Indore',
    city: 'Indore',
    area: 'MR 10',
    bio: 'Moving heads, sharpies, ambient uplighting, trussing, and DMX light programming for events.',
    services: ['Intelligent Lighting', 'Truss Setup', 'Architectural Uplighting', 'Cold Pyro'],
    experience: '7+ Years',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
    instagram: 'https://instagram.com',
  },
];

export default function CommunityPage() {
  const { isDark } = useTheme();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');

  // Compute unique cities from all leads
  const cities = useMemo(() => {
    const allCities = [...new Set(seedLeads.map((l) => l.city).filter(Boolean))];
    return ['All', ...allCities.sort()];
  }, []);

  // Compute areas based on selected city
  const areas = useMemo(() => {
    if (selectedCity === 'All') return ['All'];
    const cityLeads = seedLeads.filter((l) => l.city === selectedCity);
    const uniqueAreas = [...new Set(cityLeads.map((l) => l.area).filter(Boolean))];
    return ['All', ...uniqueAreas.sort()];
  }, [selectedCity]);

  // Reset area when city changes
  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedArea('All');
  };

  const filteredLeads = seedLeads.filter((lead) => {
    const matchesCat = selectedCat === 'All' || lead.category === selectedCat;
    const matchesCity = selectedCity === 'All' || lead.city === selectedCity;
    const matchesArea = selectedArea === 'All' || lead.area === selectedArea;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesCity && matchesArea && matchesSearch;
  });

  return (
    <div className={`pt-28 pb-24 min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Independent Business Area • Artist & Vendor Directory
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
              THE GEET <span className="text-gold-500 font-light italic">COMMUNITY</span>
            </h1>
            <p className="font-editorial text-xl italic opacity-85 mt-2">
              Connecting talented artists, creators, vendors, and event leads with direct gig opportunities.
            </p>
          </div>

          <Link
            to="/lead/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-lg shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            Join as a Community Lead
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className={`p-6 rounded-2xl border mb-10 ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gold-500" />
              <input
                type="text"
                placeholder="Search by artist name, category, or profession..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:border-gold-500 ${
                  isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                }`}
              />
            </div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold opacity-75">
              <Filter className="w-4 h-4 text-gold-500" />
              <span>{filteredLeads.length} Profiles Available</span>
            </div>
          </div>

          {/* City & Area Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <label className="block text-xs uppercase font-semibold text-gold-500 tracking-wider mb-1.5">City</label>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className={`w-full p-2.5 pr-10 text-sm rounded-xl border appearance-none cursor-pointer focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                  }`}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city === 'All' ? 'All Cities' : city}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gold-500 pointer-events-none" />
              </div>
            </div>

            <div className="relative flex-1">
              <label className="block text-xs uppercase font-semibold text-gold-500 tracking-wider mb-1.5">Area</label>
              <div className="relative">
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  disabled={selectedCity === 'All'}
                  className={`w-full p-2.5 pr-10 text-sm rounded-xl border appearance-none focus:outline-none focus:border-gold-500 ${
                    selectedCity === 'All' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  } ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                  }`}
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>{area === 'All' ? (selectedCity === 'All' ? 'Select City First' : 'All Areas') : area}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gold-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-gold-500 text-dark-950 shadow-md'
                    : isDark
                    ? 'bg-dark-800 text-warm-100 hover:border-gold-500/50 border border-dark-700'
                    : 'bg-warm-100 text-dark-800 hover:border-gold-500/50 border border-warm-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Cards Grid */}
        {filteredLeads.length === 0 ? (
          <div className="text-center py-20 opacity-75">
            <p className="font-heading text-2xl font-bold mb-2">No community profiles found</p>
            <p className="text-sm">Try selecting another category or clear your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLeads.map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-2xl overflow-hidden border flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 ${
                  isDark
                    ? 'bg-dark-900 border-dark-700 hover:border-gold-500/60 shadow-xl'
                    : 'bg-white border-warm-200 hover:border-gold-500/60 shadow-lg'
                }`}
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={lead.image}
                      alt={lead.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 text-[11px] font-bold bg-gold-500 text-dark-950 rounded uppercase tracking-wider">
                      {lead.category}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-2xl font-bold">{lead.name}</h3>
                        <span className="flex items-center gap-1 text-xs text-gold-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {lead.city}{lead.area ? `, ${lead.area}` : ''}
                        </span>
                      </div>
                      <p className="text-xs text-gold-400 font-medium">{lead.profession}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs opacity-80 line-clamp-3 mb-4">{lead.bio}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {lead.services.map((srv, i) => (
                        <span
                          key={i}
                          className={`text-[11px] px-2 py-0.5 rounded border ${
                            isDark ? 'bg-dark-800 border-dark-700 opacity-80' : 'bg-warm-100 border-warm-200'
                          }`}
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-dark-700/30 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-gold-500" />
                    <span>Verified</span>
                  </div>

                  <Link
                    to={`/community/${lead.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-all rounded"
                  >
                    View Profile
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
