import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, MapPin, Sparkles } from 'lucide-react';
import { Instagram } from '../icons/Instagram';
import { useTheme } from '../../context/ThemeContext';

const instructorData = {
  name: 'Arpit Mahor',
  role: 'Founder & Artistic Director',
  specialization: 'Choreography, Movement & Artistic Direction',
  experience: '10+ Years',
  bio: 'Arpit Mahor founded Geet Studio with the belief that art should never be restricted by rules, labels, or expectations. His work sits at the intersection of movement, storytelling, psychology, and human expression.',
  image: '/arpit-mahor.jpg',
  instagram: 'https://www.instagram.com/the_geetstudio/',
};

export default function InstructorsPreview() {
  const { isDark } = useTheme();

  return (
    <section className={`py-24 relative overflow-hidden transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-100 text-dark-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              ARTISTIC DIRECTION
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
              Founder & <span className="font-light text-gold-500 italic">Instructor</span>
            </h2>
          </div>

          <Link
            to="/instructors"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-500 hover:text-gold-400 transition-colors group"
          >
            Founder Profile & Showcase
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cinematic Founder Showcase Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl border overflow-hidden p-6 md:p-10 transition-all shadow-2xl relative ${
            isDark
              ? 'bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900 border-gold-500/30 text-warm-50'
              : 'bg-gradient-to-br from-white via-warm-50 to-white border-gold-500/40 text-dark-950'
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Portrait Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-gold-500/30 shadow-xl group">
                <img
                  src={instructorData.image}
                  alt={instructorData.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="px-3 py-1 text-[11px] font-bold bg-gold-500 text-dark-950 rounded-full uppercase tracking-wider">
                    {instructorData.experience} EXPERIENCE
                  </span>
                  <span className="text-xs text-gold-300 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> INDORE, MP
                  </span>
                </div>
              </div>
            </div>

            {/* Content & Bio */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/30 inline-block mb-3">
                  FOUNDER & ARTISTIC DIRECTOR
                </span>
                <h3 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-1">
                  {instructorData.name}
                </h3>
                <p className="text-xs md:text-sm text-gold-400 font-semibold uppercase tracking-wider">
                  {instructorData.role}
                </p>
              </div>

              {/* Specialization */}
              <div className="flex items-center gap-2 text-xs opacity-90 font-medium text-gold-300">
                <Award className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{instructorData.specialization}</span>
              </div>

              {/* Bio Quote */}
              <div className={`p-4 rounded-xl border italic text-sm ${
                isDark ? 'bg-dark-900/90 border-gold-500/20 text-gold-300' : 'bg-warm-100 border-gold-500/30 text-dark-900'
              }`}>
                “Art should never be restricted by rules, labels, or expectations.”
              </div>

              <p className="text-xs md:text-sm opacity-85 leading-relaxed font-light">
                {instructorData.bio}
              </p>

              <div className="pt-4 border-t border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
                <Link
                  to="/instructors"
                  className="px-6 py-3 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-all rounded inline-flex items-center gap-2 shadow"
                >
                  View Full Showcase
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={instructorData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-500 hover:text-gold-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
