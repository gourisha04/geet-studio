import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Sparkles, Compass, MapPin } from 'lucide-react';
import { Instagram } from '../components/icons/Instagram';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/ui/PageTransition';
import { api } from '../utils/api';

const defaultInstructor = {
  name: 'Arpit Mahor',
  role: 'Founder & Artistic Director',
  specialization: ['Choreography', 'Movement Direction', 'Artistic Direction'],
  experience: '5+ Years',
  bio: 'Arpit Mahor founded Geet Studio with the belief that art should never be restricted by rules, labels, or expectations. His work sits at the intersection of movement, storytelling, psychology, and human expression.',
  image: '/arpit-mahor.jpg',
  instagram: 'https://www.instagram.com/be_like_arpit/',
};

export default function InstructorsPage() {
  const { isDark } = useTheme();
  const [instructor, setInstructor] = useState(defaultInstructor);

  useEffect(() => {
    let cancelled = false;
    api.get('/api/instructors')
      .then((res) => {
        if (!cancelled && res?.success && Array.isArray(res.data) && res.data.length > 0) {
          const fetched = res.data[0];
          setInstructor({
            name: fetched.name || defaultInstructor.name,
            role: 'Founder & Artistic Director',
            specialization: fetched.specialization?.length ? fetched.specialization : defaultInstructor.specialization,
            experience: fetched.experience || defaultInstructor.experience,
            bio: fetched.bio || defaultInstructor.bio,
            image: fetched.profileImage?.url || defaultInstructor.image,
            instagram: fetched.socialLinks?.instagram || defaultInstructor.instagram,
          });
        }
      })
      .catch(() => { });
    return () => { cancelled = true; };
  }, []);

  return (
    <PageTransition>
      <div className={`pt-28 pb-24 min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Header Banner */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-[0.25em] mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              ARTISTIC DIRECTION & LEADERSHIP
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              The Vision <span className="text-gold-500 font-light italic">Behind Geet Studio</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-dark-200 font-light leading-relaxed max-w-2xl mx-auto"
            >
              Guiding movement, choreographic direction, and creative exploration at Geet Studio.
            </motion.p>
          </div>

          {/* Premium Founder Showcase Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`relative rounded-3xl overflow-hidden border backdrop-blur-md p-6 md:p-12 transition-all shadow-2xl ${isDark
                ? 'bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900 border-gold-500/30 text-warm-50'
                : 'bg-gradient-to-br from-white via-warm-100 to-white border-gold-500/40 text-dark-950'
              }`}
          >
            {/* Ambient Background Blur */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

              {/* Large Portrait Section */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl group">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Floating Badge on Portrait */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <span className="px-3.5 py-1 text-xs font-bold bg-gold-500 text-dark-950 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      {instructor.experience} EXPERIENCE
                    </span>
                    <span className="text-xs text-gold-300 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" /> INDORE, MP
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Showcase Info Section */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">

                {/* Founder Badge */}
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">
                    FOUNDER & ARTISTIC DIRECTOR
                  </span>

                  <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
                    {instructor.name}
                  </h2>
                  <p className="text-sm md:text-base text-gold-500 font-semibold tracking-wider uppercase">
                    {instructor.role}
                  </p>
                </div>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(instructor.specialization)
                    ? instructor.specialization.map((spec, i) => (
                      <span
                        key={i}
                        className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold tracking-wider ${isDark
                            ? 'bg-dark-800/90 border-dark-700 text-gold-400'
                            : 'bg-warm-100 border-warm-300 text-gold-600'
                          }`}
                      >
                        {spec}
                      </span>
                    ))
                    : (
                      <span className="text-xs px-3.5 py-1.5 rounded-full border border-gold-500/30 text-gold-400 font-semibold">
                        {instructor.specialization}
                      </span>
                    )
                  }
                </div>

                {/* Founder Philosophy Quote */}
                <div className={`p-6 rounded-2xl border italic relative overflow-hidden ${isDark ? 'bg-dark-900/90 border-gold-500/20 text-gold-300' : 'bg-warm-100 border-gold-500/30 text-dark-900'
                  }`}>
                  <p className="font-editorial text-lg md:text-xl leading-relaxed relative z-10">
                    “Art should never be restricted by rules, labels, or expectations.”
                  </p>
                </div>

                {/* Detailed Bio Paragraphs */}
                <div className="space-y-3 text-sm md:text-base opacity-90 leading-relaxed font-light">
                  <p>{instructor.bio}</p>
                </div>

                {/* Action CTA & Social Links */}
                <div className="pt-6 border-t border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to="/classes"
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-400 transition-all shadow-xl hover:shadow-gold-500/20 rounded"
                  >
                    <Compass className="w-4 h-4" />
                    EXPLORE CLASSES & WORKSHOPS
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {instructor.instagram && (
                    <a
                      href={instructor.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-500 hover:text-gold-400 transition-colors p-2"
                    >
                      <Instagram className="w-5 h-5" />
                      @be_like_arpit
                    </a>
                  )}
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
