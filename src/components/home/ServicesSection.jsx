import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Music, Flame, Sparkles, Trophy } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const servicesList = [
  {
    id: 'dance',
    title: 'Dance',
    subtitle: 'Primary Active Service',
    description: 'Bollywood, Hip-Hop, Contemporary, Freestyle, Salsa & Classical forms led by expert choreographers.',
    offerings: ['Bollywood', 'Hip-Hop', 'Contemporary', 'Freestyle', 'Salsa'],
    icon: Sparkles,
    badge: 'Popular',
    link: '/services/dance',
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
  },
  {
    id: 'music',
    title: 'Music',
    subtitle: 'Vocal & Instrumental',
    description: 'Vocal training, classical & contemporary instruments, rhythmic theory, and stage singing mastery.',
    offerings: ['Vocal Training', 'Acoustic Guitar', 'Keyboard & Piano', 'Rhythm & Percussion'],
    icon: Music,
    badge: 'Upcoming',
    link: '/services/music',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  },
  {
    id: 'fitness',
    title: 'Fitness',
    subtitle: 'Movement & Wellness',
    description: 'Zumba, Aerobics, Flexibility conditioning, and dance-based high-energy workout sessions.',
    offerings: ['Zumba Fitness', 'Dance Aerobics', 'Flexibility & Core', 'Body Conditioning'],
    icon: Flame,
    badge: 'Active',
    link: '/services/fitness',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
  },
  {
    id: 'events-productions',
    title: 'Events & Productions',
    subtitle: 'Shows & Choreography',
    description: 'Corporate stage shows, wedding choreography, event productions, and professional dance troupe performances.',
    offerings: ['Wedding Choreography', 'Corporate Shows', 'Event Production', 'Stage Performances'],
    icon: Trophy,
    badge: 'Custom Quotes',
    link: '/services/events-productions',
    image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=800&q=80',
  },
];

export default function ServicesSection() {
  const { isDark } = useTheme();

  return (
    <section className={`py-24 relative overflow-hidden transition-colors ${isDark ? 'bg-dark-900 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold mb-3"
            >
              What We Offer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold tracking-tight"
            >
              Our Core <span className="font-light tracking-wide text-gold-500">Services</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-500 hover:text-gold-400 transition-colors group"
            >
              View All Services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-1.5 ${
                  isDark
                    ? 'bg-dark-800/80 border-dark-700 hover:border-gold-500/50 hover:shadow-xl hover:shadow-gold-500/5'
                    : 'bg-white border-warm-200 hover:border-gold-500/50 hover:shadow-xl'
                }`}
              >
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-dark-950 rounded">
                    {service.badge}
                  </span>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gold-500/20 backdrop-blur-md flex items-center justify-center text-gold-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gold-500 font-semibold mb-2">
                      {service.subtitle}
                    </p>
                    <p className="text-sm opacity-80 mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Offerings Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.offerings.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className={`text-[11px] px-2 py-0.5 rounded border ${
                            isDark
                              ? 'bg-dark-700/60 border-dark-600 opacity-80'
                              : 'bg-warm-100 border-warm-200 text-dark-800'
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                      {service.offerings.length > 3 && (
                        <span className="text-[11px] opacity-60 flex items-center">
                          +{service.offerings.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-dark-700/40 text-xs font-semibold uppercase tracking-wider text-gold-500 group-hover:text-gold-400 transition-colors"
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
