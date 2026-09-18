import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ShieldCheck, MapPin, ArrowRight, UserPlus, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { api } from '../utils/api';
import { normalizeCommunityRecord } from '../utils/contentAdapters';

const categoriesList = [
  'All', 'Artists', 'Dancers', 'Singers', 'Musicians', 'DJs', 'Anchors',
  'Event Planners', 'Event Managers', 'Sound', 'Lighting', 'LED',
  'Decor', 'Other'
];



export default function CommunityPage() {
  const { isDark } = useTheme();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');
  const [communityRecords, setCommunityRecords] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api.get('/api/community')
      .then((res) => {
        if (!cancelled && res?.success && Array.isArray(res.data)) {
          setCommunityRecords(res.data.map(normalizeCommunityRecord));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Compute unique cities from all leads
  const cities = useMemo(() => {
    const allCities = [...new Set(communityRecords.map((l) => l.city).filter(Boolean))];
    return ['All', ...allCities.sort()];
  }, [communityRecords]);

  // Compute areas based on selected city
  const areas = useMemo(() => {
    if (selectedCity === 'All') return ['All'];
    const cityLeads = communityRecords.filter((l) => l.city === selectedCity);
    const uniqueAreas = [...new Set(cityLeads.map((l) => l.area).filter(Boolean))];
    return ['All', ...uniqueAreas.sort()];
  }, [selectedCity, communityRecords]);

  // Reset area when city changes
  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedArea('All');
  };

  const filteredLeads = communityRecords.filter((lead) => {
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
        {/* Banner Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              INDEPENDENT DOMAIN · OPPORTUNITIES PLATFORM
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-3">
              THE GEET <span className="text-gold-500 font-light italic">COMMUNITY</span>
            </h1>
            <p className="font-heading text-xl md:text-2xl font-bold text-gold-500 mb-4">
              Where Talent Meets Opportunity.
            </p>
            <p className="text-base md:text-lg opacity-85 leading-relaxed">
              Artists, creators, performers, and event professionals connected through collaboration, discovery, and real opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="#explore-leads"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-lg"
            >
              EXPLORE THE COMMUNITY →
            </a>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gold-500 text-gold-500 text-xs font-bold uppercase tracking-widest hover:bg-gold-500/10 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Join the Community
            </Link>
          </div>
        </div>

        {/* Philosophy Statement Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className={`p-8 md:p-10 rounded-2xl border mb-12 ${isDark ? 'bg-dark-900 border-gold-500/30' : 'bg-white border-warm-300 shadow-lg'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-gold-500 mb-4">
            Talent shouldn’t have to know the right person to get the right opportunity.
          </h3>
          <p className={`text-base leading-relaxed max-w-4xl ${isDark ? 'text-dark-200' : 'opacity-85'}`}>
            The Geet Community is built to make discovery easier. Find people, discover talent, build teams, collaborate on projects, and connect opportunities with the people who can bring them to life.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div id="explore-leads" className={`p-6 rounded-2xl border mb-10 ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
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
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-gold-500 uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED PROFILE
                    </span>
                    <span className="text-[10px] opacity-75 font-semibold uppercase">{lead.experience ? `${lead.experience} EXPERIENCE` : '6+ YEARS EXPERIENCE'}</span>
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
