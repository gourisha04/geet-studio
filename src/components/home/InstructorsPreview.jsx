import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import { Instagram } from '../icons/Instagram';
import { useTheme } from '../../context/ThemeContext';

const demoInstructors = [
  {
    id: 'inst-1',
    name: 'Geetika Joshi',
    role: 'Founder & Lead Choreographer',
    specialization: 'Contemporary & Bollywood Fusion',
    experience: '10+ Years',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80',
    instagram: 'https://instagram.com/the_geetstudio',
  },
  {
    id: 'inst-2',
    name: 'Vikramaditya Singh',
    role: 'Senior Hip-Hop Master',
    specialization: 'Urban Hip-Hop & Popping',
    experience: '8+ Years',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80',
    instagram: 'https://instagram.com',
  },
  {
    id: 'inst-3',
    name: 'Priya Nambiar',
    role: 'Classical & Fusion Expert',
    specialization: 'Kathak & Semi-Classical',
    experience: '7+ Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
    instagram: 'https://instagram.com',
  },
];

export default function InstructorsPreview() {
  const { isDark } = useTheme();

  return (
    <section className={`py-24 relative overflow-hidden transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-100 text-dark-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold mb-3">
              Master Mentors
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
              Meet Our <span className="font-light text-gold-500 italic">Instructors</span>
            </h2>
          </div>

          <Link
            to="/instructors"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-500 hover:text-gold-400 transition-colors group"
          >
            View All Instructors
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoInstructors.map((inst, index) => (
            <motion.div
              key={inst.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`group rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 ${
                isDark
                  ? 'bg-dark-900 border-dark-700 hover:border-gold-500/50 shadow-xl'
                  : 'bg-white border-warm-200 hover:border-gold-500/50 shadow-md'
              }`}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-gold-500 text-dark-950 rounded uppercase tracking-wider mb-2 inline-block">
                    {inst.experience}
                  </span>
                  <h3 className="font-heading text-2xl font-bold">{inst.name}</h3>
                  <p className="text-xs text-gold-400 font-medium">{inst.role}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs opacity-80 mb-4">
                  <Award className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>{inst.specialization}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dark-700/30">
                  <Link
                    to={`/instructors`}
                    className="text-xs font-semibold uppercase tracking-wider text-gold-500 hover:text-gold-400 flex items-center gap-1"
                  >
                    Profile & Classes
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={inst.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full hover:bg-gold-500/20 text-gold-500 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
