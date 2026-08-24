import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ArrowRight } from 'lucide-react';
import { Instagram } from '../components/icons/Instagram';
import { useTheme } from '../context/ThemeContext';

const instructorsList = [
  {
    id: 'inst-1',
    name: 'Geetika Joshi',
    role: 'Founder & Head Choreographer',
    specialization: 'Contemporary, Bollywood & Choreography',
    experience: '10+ Years',
    bio: 'Founder of Geet Studio. Choreographed 150+ wedding sangeets, corporate acts, and trained over 2000 students in Indore.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    instagram: 'https://instagram.com/the_geetstudio',
  },
  {
    id: 'inst-2',
    name: 'Vikramaditya Singh',
    role: 'Senior Urban Hip-Hop Master',
    specialization: 'Hip-Hop, Popping & Freestyle',
    experience: '8+ Years',
    bio: 'National hip-hop championship winner specializing in body isolations, musicality, and urban choreography.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    instagram: 'https://instagram.com',
  },
  {
    id: 'inst-3',
    name: 'Priya Nambiar',
    role: 'Classical & Fusion Expert',
    specialization: 'Kathak & Semi-Classical Fusion',
    experience: '7+ Years',
    bio: 'Experienced classical exponent bringing grace, footwork precision, and abhinaya expression into semi-classical fusion.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    instagram: 'https://instagram.com',
  },
  {
    id: 'inst-4',
    name: 'Karan Malhotra',
    role: 'Fitness & Zumba Specialist',
    specialization: 'Zumba, Aerobics & Body Conditioning',
    experience: '5+ Years',
    bio: 'Certified Zumba trainer focusing on cardio endurance, calorie-burning routines, and high-energy dance workouts.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    instagram: 'https://instagram.com',
  },
];

export default function InstructorsPage() {
  const { isDark } = useTheme();

  return (
    <div className={`pt-28 pb-24 min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-3">
            Our Mentors
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Studio <span className="text-gold-500 font-light italic">Instructors</span>
          </h1>
          <p className="font-editorial text-xl italic opacity-85">
            Learn from passionate master dancers and certified instructors dedicated to bringing out your finest expression.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {instructorsList.map((inst, index) => (
            <motion.div
              key={inst.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`rounded-2xl overflow-hidden border grid grid-cols-1 sm:grid-cols-2 transition-all duration-500 hover:-translate-y-1.5 ${
                isDark ? 'bg-dark-900 border-dark-700 hover:border-gold-500/50' : 'bg-white border-warm-200 shadow-md'
              }`}
            >
              <div className="relative h-72 sm:h-full overflow-hidden">
                <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold bg-gold-500 text-dark-950 rounded uppercase tracking-wider">
                  {inst.experience}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold">{inst.name}</h3>
                  <p className="text-xs text-gold-500 font-semibold uppercase tracking-wider mb-3">{inst.role}</p>
                  <p className="text-xs opacity-80 leading-relaxed line-clamp-4 mb-4">{inst.bio}</p>

                  <div className="flex items-center gap-2 text-xs opacity-75 mb-6">
                    <Award className="w-4 h-4 text-gold-500 shrink-0" />
                    <span>{inst.specialization}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-dark-700/30 flex items-center justify-between">
                  <Link
                    to="/classes"
                    className="text-xs font-bold uppercase tracking-wider text-gold-500 hover:text-gold-400 flex items-center gap-1"
                  >
                    View Classes
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
    </div>
  );
}
