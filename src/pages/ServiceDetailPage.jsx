import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Music, Flame, Trophy, Send, CheckCircle, Calendar, Clock, User, BookOpen, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';

const servicesData = {
  dance: {
    title: 'Dance',
    category: 'Primary Specialty',
    description: 'Where movement becomes expression, discipline becomes craft, and dance becomes a way of life.',
    longDescription: `Dance isn’t just something we teach. It’s how Geet Studio began.

We believe movement can say what words can’t. So our training goes beyond choreography, combining technique, discipline, musicality, expression, and performance to help every dancer find their own language.

From your first step to the spotlight, we’re here to build dancers who don’t just perform movement, but mean it.`,
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&q=80',
    blogArticle: null,
    offerings: [],
    classesSectionTitle: 'Dance Classes, Built to Make You Better.',
    classesSectionDesc: 'Structured training for different levels, styles, and goals. Find your class, find your people, and keep moving.',
    ctaButtonText: 'EXPLORE DANCE CLASSES →',
    bannerTitle: 'Your Next Chapter Starts in Motion.',
    bannerDesc: 'Train. Create. Perform. Become a better version of yourself through movement.',
    whySectionTitle: 'Why Dance Feels Different at Geet Studio',
    highlights: [
      { title: '🎯 Training With Purpose', desc: 'Structured classes designed to build technique, musicality, confidence, and expression.' },
      { title: '🎬 Learn From Real Experience', desc: 'Training shaped by years of stage, performance, choreography, and production experience.' },
      { title: '🔥 From Studio to Stage', desc: 'Opportunities to perform, collaborate, create, and experience what you’ve trained for.' },
      { title: '🧠 Every Level Has a Place', desc: 'Beginner, intermediate, and advanced training that grows with the dancer.' },
      { title: '🤝 A Community That Moves Together', desc: 'Freestyle sessions, collaborations, workshops, and a culture built around people who love movement.' },
      { title: '✨ More Than Just Steps', desc: 'We don’t just teach choreography. We help you understand the music, own the movement, and find your expression.' },
    ],
    classes: [
      { id: 'c-dance-1', numLabel: '01 — Bollywood', name: 'Bollywood Foundations', instructor: 'Priya Sharma', schedule: 'Mon, Wed, Fri', time: '6:00 PM - 7:00 PM', level: 'Beginner', price: '₹3,000 / mo', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', desc: 'Build your foundation in Bollywood movement, expressions, musicality, and performance.' },
      { id: 'c-dance-2', numLabel: '02 — Hip-Hop', name: 'Hip-Hop Foundations & Grooves', instructor: 'Arjun Mehra', schedule: 'Tue, Thu, Sat', time: '7:00 PM - 8:00 PM', level: 'Beginner - Intermediate', price: '₹2,500 / mo', image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&q=80', desc: 'Build rhythm, groove, musicality, and foundational hip-hop vocabulary through structured training.' },
      { id: 'c-dance-3', numLabel: '03 — Contemporary', name: 'Contemporary Flow & Floorwork', instructor: 'Meera Joshi', schedule: 'Mon, Wed', time: '5:00 PM - 6:30 PM', level: 'Intermediate', price: '₹4,000 / 6 wks', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&q=80', desc: 'Explore fluid movement, floorwork, musicality, improvisation, and the emotional side of contemporary dance.' },
    ],
    workshops: [
      { id: 'w-dance-1', name: 'Bollywood Masterclass Intensive', instructor: 'Celebrity Guest Choreographer', date: '28 August 2026', time: '4:00 PM - 7:00 PM', price: '₹1,500', mode: 'Offline Studio', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80', desc: '3-hour power masterclass focused on commercial stage presentation & expressions.' },
      { id: 'w-dance-2', name: 'Urban Hip-Hop Battle Bootcamp', instructor: 'Rohan (Crew Lead)', date: '05 September 2026', time: '5:00 PM - 8:00 PM', price: '₹1,200', mode: 'Offline Studio', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&q=80', desc: 'Freestyle battle preparation, musicality drills, and cypher confidence.' },
    ],
    pastWorks: [
      { title: 'Geet Studio Annual Dance Fest 2025', year: '2025', image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80', tag: 'Stage Show' },
      { title: 'Urban Battle Night MP', year: '2025', image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&q=80', tag: 'Street Battle' },
      { title: 'Mega Sangeet Choreography Act', year: '2024', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', tag: 'Wedding' },
    ],
  },
  music: {
    title: 'Music',
    category: 'MUSIC & PERFORMANCE',
    description: 'Where you don’t just learn music. You learn to listen, feel, and create.',
    longDescription: `Music is more than sound. It’s emotion, memory, rhythm, and expression.

At Geet Studio, we approach music as both a craft and a form of storytelling. Our training brings together technique, musical understanding, individual expression, and performance, helping you build the confidence to not just reproduce music, but make it your own.

Because the goal isn’t simply to sing or play better. It’s to have something worth expressing.`,
    icon: Music,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80',
    blogArticle: null,
    offerings: [],
    classesSectionTitle: 'Active Music Classes',
    classesSectionDesc: 'Build your pitch, instrument play, and stage expression with expert guidance.',
    ctaButtonText: 'EXPLORE ALL CLASSES →',
    highlights: ['Certified vocal coaches & instrumental faculty', 'Small batch sizes for maximum personal feedback', 'Monthly Unplugged Jam Recitals', 'In-house recording studio access for students', 'Mic technique & stage presence training', 'Preparation for Trinity & Gandharva Music Exams'],
    classes: [
      { id: 'c-music-1', numLabel: '01 — Vocals', name: 'Hindustani & Contemporary Vocals', instructor: 'Pt. Alok Sharma', schedule: 'Tue, Thu, Sat', time: '5:30 PM - 6:30 PM', level: 'All Levels', price: '₹3,500 / mo', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80', desc: 'Build your voice from the foundation — sur, taal, breath control, expression, and the art of singing with intention.' },
      { id: 'c-music-2', numLabel: '02 — Guitar', name: 'Acoustic Guitar Foundations', instructor: 'Kabir Das', schedule: 'Mon, Wed, Fri', time: '6:30 PM - 7:30 PM', level: 'Beginner', price: '₹3,000 / mo', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80', desc: 'Learn chords, rhythm, strumming, basic music theory, and the confidence to play the songs you love.' },
    ],
    workshops: [
      { id: 'w-music-1', name: 'Sufi & Semi-Classical Vocal Jam', instructor: 'Alok Vocal Studio', date: '30 August 2026', time: '5:00 PM - 7:30 PM', price: '₹1,000', mode: 'Offline Studio', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80', desc: 'Immersive 2.5 hour vocal workshop exploring Sufi soul & acoustic arrangements.' },
    ],
    pastWorks: [
      { title: 'Geet Studio Acoustic Unplugged Night', year: '2025', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', tag: 'Live Concert' },
      { title: 'Youth Vocal Recital Showcase', year: '2024', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80', tag: 'Vocal Show' },
    ],
  },
  fitness: {
    title: 'Fitness',
    category: 'HEALTH & CONDITIONING',
    description: 'Build a body that moves better, feels stronger, and keeps up with your life.',
    longDescription: `Move More. Feel Stronger. Live Better.

Fitness at Geet Studio is about building a body you can live, dance, play, perform, and grow in. We combine conditioning, functional movement, and high-energy sessions to make getting stronger feel less like a chore and more like a part of your life.`,
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80',
    blogArticle: null,
    offerings: [],
    classesSectionTitle: 'Active Fitness & Movement Department',
    classesSectionDesc: 'Move for strength. Train for energy. Build a body that feels good to live in.',
    workshopsSectionLabel: 'SPECIAL PROGRAMS',
    workshopsSectionTitle: 'Workshops, Bootcamps & Experiences.',
    ctaButtonText: 'EXPLORE ALL CLASSES →',
    highlights: ['No prior dance or fitness experience needed', 'Burn 400 - 800 calories per 60-min batch', 'Morning & Evening flexible timing options', 'Licensed Zumba & fitness certified trainers', 'Energizing light setup & acoustic sound system', 'Inclusive, high-energy community environment'],
    classes: [
      { id: 'c-fit-1', numLabel: '01 — Zumba', name: 'Morning Power Zumba', instructor: 'Simran Kaur', schedule: 'Mon to Fri (5 Days)', time: '7:00 AM - 8:00 AM', level: 'All Levels', price: '₹2,500 / mo', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', desc: 'Start your day with energetic dance-based cardio, rhythm, and a full-body workout.' },
      { id: 'c-fit-2', numLabel: '02 — Aerobics', name: 'Evening Dance Aerobics', instructor: 'Neha Verma', schedule: 'Mon, Wed, Fri', time: '6:30 PM - 7:30 PM', level: 'All Levels', price: '₹2,200 / mo', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&q=80', desc: 'High-energy cardio through dance, music, and movement. Fitness that doesn’t feel like punishment.' },
      { id: 'c-fit-3', numLabel: '03 — Yoga', name: 'Yoga & Mobility', instructor: 'Ananya Sharma', schedule: 'Tue, Thu, Sat', time: '6:00 AM - 7:00 AM', level: 'All Levels', price: '₹2,800 / mo', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80', desc: 'Build flexibility, balance, mobility, and body awareness through mindful movement and breath.' },
      { id: 'c-fit-4', numLabel: '04 — Aerial', name: 'Aerial Fitness', instructor: 'Rohan Verma', schedule: 'Sat, Sun', time: '8:00 AM - 9:30 AM', level: 'All Levels', price: '₹3,500 / mo', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', desc: 'Build strength, control, flexibility, and confidence through movement in the air.' },
    ],
    workshops: [
      { id: 'w-fit-1', name: 'Sunday Morning Zumba Marathon', instructor: 'Simran & Crew', date: '06 September 2026', time: '7:30 AM - 9:30 AM', price: '₹500', mode: 'Outdoor Garden / Studio', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', desc: '2-hour non-stop cardio workout party with guest fitness instructors.' },
    ],
    pastWorks: [
      { title: 'Indore Open Air Fitness Fest', year: '2025', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80', tag: 'Fitness Event' },
      { title: 'Geet Studio Zumba Marathon', year: '2024', image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80', tag: 'Marathon' },
    ],
  },
  'events-productions': {
    title: 'Events & Productions',
    category: 'Shows & Choreography',
    description: 'End-to-end choreography and stage management for corporate events, weddings, and production shows. Let us bring your vision to life with professional artistry.',
    longDescription: 'Geet Studio Productions handles complete event choreography, dance troupe bookings, creative direction, costume design guidance, and stage execution for weddings, corporate galas, and concert shows across India.',
    icon: Trophy,
    isQuoteRequired: true,
    image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=1200&q=80',
    blogArticle: {
      title: 'Crafting Unforgettable Stage Spectacles: The Art of Production & Choreography',
      readTime: '6 min read',
      author: 'Geet Studio Productions Division',
      quote: 'Great events are not just watched — they are remembered for a lifetime. We bring professional choreography, lighting harmony, and seamless execution to every stage.',
      sections: [
        { heading: '1. Wedding Sangeet Perfection: Tailored for Every Family', content: 'A sangeet is the emotional highlight of an Indian wedding. From grand couple entries and flash mobs to hilarious family dance-offs, our choreographers craft customized routines suited to every family member’s comfort and style.' },
        { heading: '2. Corporate Shows & Brand Activation Act', content: 'We produce show-stopping corporate acts for product launches, annual award nights, and team celebrations. Our professional dance troupes deliver high-impact themed performances tailored to company brand aesthetics.' },
        { heading: '3. Comprehensive Production Direction', content: 'Beyond dance moves, Geet Studio manages track mixing, costume color coordination, rehearsal scheduling, lighting cues, and backstage stage management — ensuring a flawless live show.' },
      ],
    },
    offerings: [
      { name: 'Royal Wedding Sangeet Package', desc: 'Custom choreography for couples, parents, friends, and mega finale acts. Rehearsal managers included.' },
      { name: 'Corporate Gala & Annual Night', desc: 'Employee group choreography, flash mobs, theme-based acts, and professional troupe performances.' },
      { name: 'Concert & Troupe Stage Acts', desc: 'High-octane backup dance troupe, celebrity entrance acts, and production show direction.' },
      { name: 'Custom Concept Direction', desc: 'Scripted musical acts, narrative dance plays, LED background sync, and audio track mixing.' },
    ],
    highlights: ['200+ successful weddings & corporate galas delivered', 'Dedicated rehearsal venue or doorstep doorstep choreography', 'Professional backup dance troupe with costume inventory', 'Custom DJ sound mixing & audio editing included', 'Pan-India event management and travel team', 'Experienced stage managers ensuring zero backstage delay'],
    classes: [
      { id: 'c-evt-1', name: 'Wedding Sangeet Choreography Package', instructor: 'Senior Lead Choreographers', schedule: 'Flexible Rehearsal Dates', time: 'Custom Slot', level: 'Custom for All Ages', price: 'Custom Quote', image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=600&q=80', desc: 'Complete Sangeet package including family acts, couple dance, entry & finale.' },
      { id: 'c-evt-2', name: 'Corporate Annual Day Production', instructor: 'Production Team', schedule: 'Project Based', time: 'Flexible', level: 'Professional Troupe & Employee Acts', price: 'Custom Quote', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80', desc: 'End-to-end employee choreography & professional troupe performance for corporate galas.' },
    ],
    workshops: [
      { id: 'w-evt-1', name: 'Sangeet Couple Express Bootcamp', instructor: 'Priya & Lead Team', date: 'Flexible Weekend', time: '3 Hours Intensive', price: '₹3,500 / couple', mode: 'Private Studio', image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=600&q=80', desc: 'Rapid 3-hour intensive session to master 2 complete couple dance routines.' },
    ],
    pastWorks: [
      { title: 'Royal Indore Wedding Sangeet Gala', year: '2025', image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=800&q=80', tag: 'Sangeet' },
      { title: 'Central MP Corporate Excellence Awards', year: '2025', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', tag: 'Corporate' },
    ],
  },
};

export default function ServiceDetailPage() {
  const { id } = useParams();
  const { isDark } = useTheme();
  const [service, setService] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api.get('/api/services')
      .then((res) => {
        const record = res?.data?.find((item) => item._id === id || item.slug === id);
        if (!cancelled && res?.success && record) {
          setService({
            ...record,
            category: record.category || 'Studio Service',
            description: record.description || 'Professional studio service at Geet Studio.',
            longDescription: record.longDescription || record.description || 'Professional studio service at Geet Studio.',
            image: record.media?.url || 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&q=80',
            icon: Sparkles,
            offerings: (record.offerings || []).map((offering) => ({
              ...offering,
              desc: offering.description || offering.desc || '',
            })),
            classes: [],
            workshops: [],
            highlights: [],
            pastWorks: [],
          });
        }
      })
      .catch(() => {
        if (!cancelled) setService(null);
      });
    return () => { cancelled = true; };
  }, [id]);

  const [quoteModal, setQuoteModal] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', eventType: 'Wedding Choreography', eventDate: '', message: '' });
  const [registerModal, setRegisterModal] = useState(null);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', note: '' });
  const [registerSuccess, setRegisterSuccess] = useState(false);

  if (!service) {
    return (
      <div className={`pt-32 pb-24 min-h-screen flex items-center justify-center ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services" className="px-6 py-3 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider">Back to All Services</Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const handleQuoteSubmit = (e) => { e.preventDefault(); setQuoteSent(true); };
  const handleRegisterSubmit = (e) => { e.preventDefault(); setRegisterSuccess(true); };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <section className="relative h-[55vh] min-h-[440px] flex items-end overflow-hidden">
        <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/65 to-dark-950/20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-gold-500 hover:text-gold-400 mb-4"><ArrowLeft className="w-4 h-4" />Back to All Services</Link>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 backdrop-blur-md flex items-center justify-center text-gold-500 shadow-lg"><Icon className="w-7 h-7" /></div>
              <span className="px-3 py-1 text-xs font-bold bg-gold-500 text-dark-950 rounded uppercase tracking-wider">{service.category}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-warm-50">{service.title} <span className="text-gold-500 font-light italic">Department</span></h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="max-w-4xl">
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold mb-3">Overview & Philosophy</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">{service.description}</h2>
            <div className={`space-y-4 text-base md:text-lg leading-relaxed ${isDark ? 'text-dark-200' : 'opacity-85'}`}>
              {service.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {service.blogArticle && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`p-8 md:p-12 rounded-3xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-xl'}`}>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gold-500 font-semibold mb-4"><span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Feature Article</span><span>•</span><span>{service.blogArticle.readTime}</span><span>•</span><span>By {service.blogArticle.author}</span></div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gold-500">{service.blogArticle.title}</h2>
              <div className="p-6 rounded-2xl border border-gold-500/30 bg-gold-500/10 italic text-sm md:text-base font-serif mb-8 text-gold-300">"{service.blogArticle.quote}"</div>
              <div className="space-y-6">
                {service.blogArticle.sections.map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="font-heading text-xl font-bold text-warm-50">{sec.heading}</h3>
                    <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-dark-200' : 'opacity-80'}`}>{sec.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {service.offerings && service.offerings.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold mb-3">Disciplines & Modules</p>
              <h3 className="font-heading text-3xl font-bold mb-8">Key Programs & <span className="text-gold-500 font-light italic">Offerings</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.offerings.map((off, i) => (
                  <div key={i} className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-dark-900 border-dark-700 hover:border-gold-500/50' : 'bg-white border-warm-200 shadow-md hover:border-gold-500/50'}`}>
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500 mb-4"><Icon className="w-5 h-5" /></div>
                    <h4 className="font-heading text-lg font-bold text-gold-500 mb-2">{off.name}</h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'opacity-80' : 'opacity-75'}`}>{off.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {service.classes && service.classes.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2">REGULAR PROGRAMS</p>
                  <h3 className="font-heading text-3xl font-bold">{service.classesSectionTitle || `Active ${service.title} Classes`}</h3>
                  {service.classesSectionDesc && (
                    <p className={`text-sm md:text-base mt-2 max-w-2xl ${isDark ? 'text-dark-200' : 'opacity-80'}`}>{service.classesSectionDesc}</p>
                  )}
                </div>
                <Link to="/classes" className="text-xs uppercase font-bold text-gold-500 flex items-center gap-1 hover:text-gold-400 shrink-0">EXPLORE ALL CLASSES <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.classes.map((c) => (
                  <div key={c.id} className={`rounded-2xl overflow-hidden border flex flex-col ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-lg'}`}>
                    <div className="h-48 relative overflow-hidden">
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      <span className="absolute top-3 right-3 px-3 py-1 bg-gold-500 text-dark-950 font-bold text-[10px] uppercase rounded">{c.level}</span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {c.numLabel && (
                          <span className="text-[11px] font-bold text-gold-500 uppercase tracking-widest block mb-1">{c.numLabel}</span>
                        )}
                        <h4 className="font-heading text-xl font-bold text-gold-500 mb-1">{c.name}</h4>
                        <p className="text-xs opacity-70 mb-3 leading-relaxed">{c.desc}</p>
                        <div className="space-y-1.5 text-xs opacity-80">
                          <p className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-gold-500" /> Instructor: {c.instructor}</p>
                          <p className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-gold-500" /> {c.schedule}</p>
                          <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gold-500" /> {c.time}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-dark-700/50 flex items-center justify-between">
                        <span className="text-sm font-bold text-gold-500">{c.price}</span>
                        <button onClick={() => { setRegisterModal(c); setRegisterSuccess(false); }} className="px-4 py-2 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all cursor-pointer rounded flex items-center gap-1">JOIN THIS CLASS <ArrowRight className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {service.workshops && service.workshops.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2">{service.workshopsSectionLabel || 'Short Courses & Bootcamps'}</p>
                  <h3 className="font-heading text-3xl font-bold">{service.workshopsSectionTitle || <>Specialized <span className="text-gold-500 font-light italic">{service.title} Workshops</span></>}</h3>
                </div>
                <Link to="/workshops" className="text-xs uppercase font-bold text-gold-500 flex items-center gap-1 hover:text-gold-400">View All Workshops <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.workshops.map((w) => (
                  <div key={w.id} className={`p-6 rounded-2xl border flex flex-col sm:flex-row gap-6 items-center ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
                    <div className="w-full sm:w-40 h-36 rounded-xl overflow-hidden shrink-0"><img src={w.image} alt={w.name} className="w-full h-full object-cover" /></div>
                    <div className="space-y-3 flex-1">
                      <span className="px-2.5 py-0.5 bg-gold-500/20 text-gold-500 text-[10px] font-bold uppercase rounded border border-gold-500/30">{w.mode}</span>
                      <h4 className="font-heading text-lg font-bold text-gold-500">{w.name}</h4>
                      <p className="text-xs opacity-80">{w.desc}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs opacity-75">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold-500" /> {w.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold-500" /> {w.time}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-bold text-gold-500">{w.price}</span>
                        <button onClick={() => { setRegisterModal(w); setRegisterSuccess(false); }} className="px-4 py-2 border border-gold-500 text-gold-500 font-bold text-xs uppercase hover:bg-gold-500/10 transition-all cursor-pointer rounded">Enroll Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {service.pastWorks && service.pastWorks.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs tracking-[0.3em] uppercase text-gold-500 font-semibold mb-2">Proven Track Record</p>
              <h3 className="font-heading text-3xl font-bold mb-8">Past <span className="text-gold-500 font-light italic">{service.title} Highlights & Showcase</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {service.pastWorks.map((pw, i) => (
                  <div key={i} className="group relative h-64 rounded-2xl overflow-hidden border border-dark-700 shadow-lg">
                    <img src={pw.image} alt={pw.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
                      <span className="px-2.5 py-0.5 bg-gold-500 text-dark-950 font-bold text-[10px] uppercase rounded self-start mb-2">{pw.tag} • {pw.year}</span>
                      <h4 className="font-heading text-lg font-bold text-white">{pw.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-6">{service.whySectionTitle || <>Why Students Choose <span className="text-gold-500 font-light italic">{service.title}</span> at Geet Studio</>}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.highlights.map((h, i) => (
                typeof h === 'object' ? (
                  <div key={i} className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
                    <h4 className="font-heading text-lg font-bold text-gold-500 mb-2">{h.title}</h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-dark-200' : 'opacity-80'}`}>{h.desc}</p>
                  </div>
                ) : (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-sm'}`}>
                    <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{h}</span>
                  </div>
                )
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`p-8 md:p-12 rounded-3xl border text-center ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-xl'}`}>
            <h3 className="font-heading text-2xl md:text-4xl font-bold mb-3">{service.bannerTitle ? service.bannerTitle : <>Ready to Master <span className="text-gold-500">{service.title}</span>?</>}</h3>
            <p className={`text-sm md:text-base mb-8 max-w-xl mx-auto ${isDark ? 'opacity-80' : 'opacity-75'}`}>{service.bannerDesc || (service.isQuoteRequired ? 'Tell us about your event and we will craft a custom stage act tailored to your vision.' : 'Join our next batch and take your skills to the next level with our master faculty.')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/classes" className="px-8 py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all shadow-lg flex items-center gap-2">{service.ctaButtonText || 'EXPLORE ALL CLASSES →'} <ArrowRight className="w-4 h-4" /></Link>
              {service.isQuoteRequired && (
                <button onClick={() => setQuoteModal(true)} className="px-8 py-3.5 border border-gold-500 text-gold-500 font-bold text-xs uppercase tracking-widest hover:bg-gold-500/10 transition-all cursor-pointer">Request Custom Quote</button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {quoteModal && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md" onClick={() => setQuoteModal(false)}>
          <div className={`relative w-full max-w-lg rounded-2xl border p-6 md:p-8 ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200'}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setQuoteModal(false)} className="absolute top-4 right-4 text-gold-500 cursor-pointer"><X className="w-5 h-5" /></button>
            {quoteSent ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gold-500 mb-2">Quote Request Sent!</h3>
                <p className="text-sm opacity-80 mb-6">Our events team will contact you with custom package options within 24 hours.</p>
                <button onClick={() => { setQuoteSent(false); setQuoteModal(false); }} className="px-6 py-2.5 bg-gold-500 text-dark-950 text-xs font-bold uppercase cursor-pointer">Close</button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <h3 className="font-heading text-2xl font-bold text-gold-500">Events & Production Quote</h3>
                <div>
                  <label className="block text-xs uppercase font-semibold mb-1">Your Name *</label>
                  <input type="text" required value={quoteForm.name} onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-semibold mb-1">Email *</label>
                    <input type="email" required value={quoteForm.email} onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold mb-1">Phone *</label>
                    <input type="tel" required value={quoteForm.phone} onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold mb-1">Message / Requirements</label>
                  <textarea rows={3} value={quoteForm.message} onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                </div>
                <button type="submit" className="w-full py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"><Send className="w-4 h-4" /> Submit Quote Request</button>
              </form>
            )}
          </div>
        </div>
      )}

      {registerModal && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md" onClick={() => setRegisterModal(null)}>
          <div className={`relative w-full max-w-md rounded-2xl border p-6 md:p-8 ${isDark ? 'bg-dark-900 border-dark-700 text-warm-50' : 'bg-white border-warm-200 text-dark-950'}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setRegisterModal(null)} className="absolute top-4 right-4 text-gold-500 cursor-pointer"><X className="w-5 h-5" /></button>
            {registerSuccess ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gold-500 mb-2">Registration Received!</h3>
                <p className="text-sm opacity-80 mb-6">Our studio coordinator will call you to confirm your seat and batch timings.</p>
                <button onClick={() => setRegisterModal(null)} className="px-6 py-2.5 bg-gold-500 text-dark-950 text-xs font-bold uppercase cursor-pointer">Close</button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gold-500 tracking-wider">Registering For</span>
                  <h3 className="font-heading text-xl font-bold text-gold-500">{registerModal.name}</h3>
                  <p className="text-xs opacity-70">{registerModal.price} • {registerModal.schedule || registerModal.date}</p>
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold mb-1">Your Full Name *</label>
                  <input type="text" required value={registerForm.name} onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold mb-1">Email Address *</label>
                  <input type="email" required value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold mb-1">Phone Number *</label>
                  <input type="tel" required value={registerForm.phone} onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})} className={`w-full p-2.5 text-sm rounded border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-warm-50 border-warm-300'}`} />
                </div>
                <button type="submit" className="w-full py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"><Send className="w-4 h-4" /> Send Registration Interest</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
