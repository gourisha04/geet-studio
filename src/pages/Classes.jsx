import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, Music, Flame, SlidersHorizontal, RefreshCw } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import ClassCard from '../components/cards/ClassCard';
import PageTransition from '../components/ui/PageTransition';
import { useTheme } from '../context/ThemeContext';
import { api } from '../utils/api';
import { normalizeClassRecord } from '../utils/contentAdapters';

const mainCategories = [
  { id: 'ALL', label: 'All Classes', icon: Sparkles },
  { id: 'Dance', label: 'Dance', icon: Sparkles },
  { id: 'Music', label: 'Music', icon: Music },
  { id: 'Fitness', label: 'Fitness & Movement', icon: Flame },
  { id: 'Events & Productions', label: 'Events & Productions', icon: Sparkles },
];

const danceStyles = ['ALL STYLES', 'Bollywood', 'Hip-Hop', 'Contemporary', 'Salsa', 'Kathak Fusion', 'Freestyle', 'Semi-Classical', 'Classical', 'Heels', 'Choreography'];
const levelOptions = ['ALL LEVELS', 'Beginner', 'Intermediate'];

export default function Classes() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStyle, setSelectedStyle] = useState('ALL STYLES');
  const [selectedLevel, setSelectedLevel] = useState('ALL LEVELS');
  const [searchQuery, setSearchQuery] = useState('');
  const [classRecords, setClassRecords] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api.get('/api/classes')
      .then((res) => {
        if (!cancelled && res?.success && Array.isArray(res.data)) {
          setClassRecords(res.data.filter((item) => item.type !== 'workshop').map(normalizeClassRecord));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const filteredClasses = useMemo(() => {
    return classRecords.filter((item) => {
      // Main category matching
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        // Fallback for older items missing category field
        if (selectedCategory === 'Dance' && item.category && item.category !== 'Dance') return false;
        if (selectedCategory === 'Music' && item.category !== 'Music') return false;
        if (selectedCategory === 'Fitness' && item.category !== 'Fitness') return false;
        if (selectedCategory === 'Events & Productions' && item.category !== 'Events & Productions') return false;
      }

      // Specific style/subtype filter
      if (selectedStyle !== 'ALL STYLES' && selectedStyle !== 'ALL SUBTYPES') {
        const itemSubtype = (item.subtype || item.danceStyle || item.musicType || item.fitnessType || item.productionType || item.style || '').toLowerCase();
        if (!itemSubtype.includes(selectedStyle.toLowerCase())) {
          return false;
        }
      }

      // Level filter
      if (selectedLevel !== 'ALL LEVELS') {
        if (item.level !== selectedLevel && item.level !== 'All Levels') return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCategory = (item.category || '').toLowerCase().includes(query);
        const matchesSubtype = (item.subtype || item.style || '').toLowerCase().includes(query);
        const matchesInstructor = item.instructor.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesSubtype && !matchesInstructor && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [classRecords, selectedCategory, selectedStyle, selectedLevel, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedStyle('ALL STYLES');
    setSelectedLevel('ALL LEVELS');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'ALL' ||
    (selectedStyle !== 'ALL STYLES' && selectedStyle !== 'ALL SUBTYPES') ||
    selectedLevel !== 'ALL LEVELS' ||
    searchQuery.trim() !== '';

  return (
    <PageTransition>
      <div className={`min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
        
        {/* Header Hero */}
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-4 md:px-8 border-b border-dark-800/60">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-[0.25em] mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              STRUCTURED TRAINING
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Explore Our <span className="text-gold-500 font-light italic">Classes</span>
            </h1>
            <p className="text-base md:text-lg text-dark-200 font-light max-w-2xl mx-auto leading-relaxed">
              From beginner foundations to masterclasses across Dance, Music, Fitness, and Events & Productions.
            </p>
          </div>
        </section>

        {/* Filter Controls Section */}
        <section className="py-8 px-4 md:px-8 sticky top-20 z-20 backdrop-blur-xl bg-dark-950/80 border-b border-dark-800/80">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Top Bar: Category Tabs & Search Input */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
                {mainCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedStyle('ALL STYLES');
                      }}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-gold-500 text-dark-950 shadow-lg shadow-gold-500/20 scale-[1.02]'
                          : 'bg-dark-900 text-dark-200 hover:text-warm-50 hover:bg-dark-800 border border-dark-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar Input */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-gold-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search classes, styles, instructors..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:border-gold-500 transition-colors ${
                    isDark ? 'bg-dark-900 border-dark-800 text-warm-50 placeholder-dark-400' : 'bg-white border-warm-300 text-dark-950'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-dark-400 hover:text-warm-50"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Secondary Controls: Dance Styles & Level Filter */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-dark-800/40">
              
              {/* Dance Styles / Subtype Pills */}
              {(selectedCategory === 'ALL' || selectedCategory === 'Dance') ? (
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-dark-400 uppercase font-semibold tracking-widest text-[10px] mr-1">STYLE:</span>
                  {danceStyles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedStyle === style
                          ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                          : 'text-dark-300 hover:text-warm-50 hover:bg-dark-900'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gold-400/90 font-medium">
                  Showing {selectedCategory} Classes & Programs
                </div>
              )}

              {/* Level Filter & Reset */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-dark-400 uppercase font-semibold tracking-widest text-[10px]">LEVEL:</span>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold uppercase border focus:outline-none focus:border-gold-500 transition-colors ${
                      isDark ? 'bg-dark-900 border-dark-800 text-warm-50' : 'bg-white border-warm-300 text-dark-950'
                    }`}
                  >
                    {levelOptions.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[11px] font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-dark-950 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Classes Grid Listing */}
        <section className="py-12 pb-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Filter Result Counter */}
            <div className="mb-8 flex items-center justify-between text-xs text-dark-300 border-b border-dark-800/60 pb-3">
              <span>
                Showing <strong className="text-gold-400 font-bold">{filteredClasses.length}</strong> {filteredClasses.length === 1 ? 'Class' : 'Classes'}
              </span>
              {hasActiveFilters && (
                <span className="text-gold-400/80 italic">Filtered view</span>
              )}
            </div>

            {filteredClasses.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredClasses.map((classData) => (
                    <motion.div
                      key={classData.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ClassCard classData={classData} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-dark-900/40 rounded-3xl border border-dark-800 max-w-xl mx-auto p-8">
                <SlidersHorizontal className="w-12 h-12 text-gold-500/50 mx-auto mb-4 animate-pulse" />
                <h3 className="font-heading text-2xl font-bold mb-2">No Matching Classes</h3>
                <p className="text-sm text-dark-300 mb-6 leading-relaxed">
                  We couldn't find any classes matching your selected filters or search terms. Try adjusting your selections or view all classes.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gold-400 transition-all shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
