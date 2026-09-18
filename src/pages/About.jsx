import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Heart, Target, Compass, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { Instagram } from '../components/icons/Instagram';
import PageTransition from '../components/ui/PageTransition';

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden border-b border-dark-800">
        <img
          src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1920&q=80"
          alt="About Geet Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/75 to-dark-950/40" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 font-bold text-xs uppercase tracking-widest mb-4">
              ABOUT US
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-warm-50 tracking-tight">
              Born From Movement. <span className="text-gold-500 font-light italic">Built to Create.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-3 font-semibold">OUR STORY</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-warm-50 mb-8 leading-tight">
              It Started With Dance. <span className="text-gold-500 font-light italic">The Idea Was Always Bigger.</span>
            </h2>
            <div className="space-y-6 text-dark-200 leading-relaxed text-base md:text-lg">
              <p>
                Geet Studio began with a simple belief: movement can change the way we see ourselves and the world around us.
              </p>
              <p>
                What started as a dance space in Katni grew through classes, performances, choreography, workshops, collaborations, and the people who kept showing up to create something together.
              </p>
              <p>
                Over time, we realised that the studio was becoming more than a place to learn dance. It was becoming a place where people move, make music, train, perform, collaborate, and find their people.
              </p>
              <p>
                Today, Geet Studio continues that journey in Indore with four growing worlds under one roof: <strong className="text-gold-400 font-semibold">Dance, Music, Fitness & Movement, and Events</strong>. Around them sits a community of artists, creators, performers, and professionals connected by one idea: there should always be a place to learn, create, and express.
              </p>
              <div className="p-6 rounded-2xl bg-dark-900 border border-gold-500/30 text-warm-50 italic font-editorial text-lg leading-relaxed">
                <p className="mb-3 font-normal text-gold-400">
                  "Geet means song or melody. And that’s still at the heart of who we are."
                </p>
                <p className="text-sm not-italic opacity-90">
                  Dance is music made visible. Music gives movement a voice. Fitness gives the body strength to move. Events bring all of it together into experiences people remember.
                </p>
                <p className="text-sm not-italic font-semibold text-gold-500 mt-4">
                  We’re not here to simply teach skills. We’re here to build a space where people discover what they can create with them.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 px-4 md:px-8 bg-dark-950 border-t border-b border-dark-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { stat: '3+ YEARS', label: 'BUILDING & CREATING' },
            { stat: '2000+', label: 'STUDENTS & PARTICIPANTS' },
            { stat: '50+', label: 'WORKSHOPS & EXPERIENCES' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-dark-900 border border-dark-700 p-8 rounded-2xl text-center shadow-lg"
            >
              <h3 className="font-heading text-4xl font-bold text-gold-500 mb-2">{item.stat}</h3>
              <p className="text-xs uppercase tracking-widest text-dark-200 font-semibold">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission, Philosophy, Community */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-dark-900 border border-dark-800 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <p className="text-xs tracking-[0.2em] font-bold text-gold-500 uppercase">MISSION</p>
            <h3 className="font-heading text-xl font-bold text-warm-50">To Keep Art Free & Alive</h3>
            <p className="text-xs md:text-sm text-dark-200 leading-relaxed">
              To create a space where art remains free, personal, and alive. We believe quality artistic education should be accessible to everyone, while giving every individual the freedom to discover their own voice, identity, and expression.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="p-8 rounded-2xl bg-dark-900 border border-dark-800 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <p className="text-xs tracking-[0.2em] font-bold text-gold-500 uppercase">PHILOSOPHY</p>
            <h3 className="font-heading text-xl font-bold text-warm-50">Art Should Never Be Bounded</h3>
            <p className="text-xs md:text-sm text-dark-200 leading-relaxed">
              We don’t believe there is one right way to move, create, or express. Every person carries a different story, and our role is not to define their expression, but to help them discover it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-8 rounded-2xl bg-dark-900 border border-dark-800 space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-xs tracking-[0.2em] font-bold text-gold-500 uppercase">COMMUNITY</p>
            <h3 className="font-heading text-xl font-bold text-warm-50">Art Is Meant to Be Shared</h3>
            <p className="text-xs md:text-sm text-dark-200 leading-relaxed">
              Life is meant to be lived fully, and art is meant to be shared. Geet Studio is a space where people come together to learn, create, perform, experiment, and grow. We celebrate individuality while building a community that inspires people to live, create, and express without fear.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Founder & Artistic Director */}
      <section className="py-20 px-4 md:px-8 bg-dark-950 border-t border-dark-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center"
          >
            <div className="aspect-square overflow-hidden border border-gold-500/30 rounded-2xl group shadow-2xl">
              <img
                src="/arpit-mahor.jpg"
                alt="Arpit Mahor"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <p className="text-xs tracking-[0.3em] uppercase text-gold-500 font-bold">FOUNDER & ARTISTIC DIRECTOR</p>
              <h3 className="font-heading text-3xl font-bold text-warm-50">Arpit Mahor</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Artist. Choreographer. Founder.</p>
              <p className="text-dark-200 leading-relaxed text-sm md:text-base">
                Arpit Mahor founded Geet Studio with the belief that art should never be restricted by rules, labels, or expectations. His work sits at the intersection of movement, storytelling, psychology, and human expression.
              </p>
              <p className="text-dark-200 leading-relaxed text-sm md:text-base">
                For him, dance is not simply about learning steps. It is a way of understanding ourselves, experiencing life, and communicating what words sometimes cannot.
              </p>
              <p className="text-dark-200 leading-relaxed text-sm md:text-base">
                Geet Studio is his attempt to build the kind of creative space he believes artists deserve: a place where people can explore freely, find their own meaning, and become more deeply connected with themselves and others.
              </p>
              
              <div className="pt-4 border-t border-dark-800">
                <p className="font-editorial text-lg italic text-gold-400">
                  “Before we try to understand the world, we have to understand ourselves. Art begins there.”
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Name Section */}
      <section className="py-20 px-4 md:px-8 border-t border-dark-800">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-500 font-bold">THE NAME</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-warm-50">Why “Geet”?</h2>
          <div className="p-8 rounded-2xl bg-dark-900 border border-gold-500/20 text-dark-200 space-y-4 text-base md:text-lg leading-relaxed">
            <p className="font-medium text-warm-50">
              Geet began with someone very close to home.
            </p>
            <p>
              The name comes from <strong className="text-gold-400 font-semibold">Geeta</strong>, my mother’s name.
              And geet also means a song, a melody, a form of expression.
            </p>
            <p>
              Somewhere between those two meanings, Geet Studio found its identity.
            </p>
            <p className="italic text-gold-300 font-editorial pt-2">
              A name rooted in where I came from, built around what I love, and open to becoming whatever life brings into it.
            </p>
          </div>
        </div>
      </section>

      {/* Location & Contact Info */}
      <section className="py-24 px-4 md:px-8 bg-dark-950 border-t border-dark-800/80 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
              <MapPin className="w-3.5 h-3.5" />
              VISIT US
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-warm-50 mb-4">
              Geet Studio <span className="text-gold-500 font-light italic">Indore</span>
            </h2>
            <p className="text-dark-200 text-sm md:text-base leading-relaxed">
              Step into our space. Whether you're coming for a class, a workshop, or to collaborate with our community, our doors are always open to movement.
            </p>
          </motion.div>

          {/* 4 Interactive Feature Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tile 1: Location & Google Maps */}
            <motion.a
              href="https://maps.app.goo.gl/bZWfcrfVsUsPM9RP7?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-dark-900/90 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-dark-950 transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-500 mb-1">LOCATION</p>
                <h3 className="font-heading text-lg font-bold text-warm-50 mb-2">Indore Studio</h3>
                <p className="text-xs text-dark-300 leading-relaxed">Indore, Madhya Pradesh, India</p>
              </div>
              <div className="mt-6 pt-4 border-t border-dark-800 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:text-gold-300">
                <span>Open Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>

            {/* Tile 2: Phone */}
            <motion.a
              href="tel:+918770409447"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-dark-900/90 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-dark-950 transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-500 mb-1">CALL OR WHATSAPP</p>
                <h3 className="font-heading text-lg font-bold text-warm-50 mb-2">+91 87704 09447</h3>
                <p className="text-xs text-dark-300 leading-relaxed">Direct studio line for enquiries & registration</p>
              </div>
              <div className="mt-6 pt-4 border-t border-dark-800 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:text-gold-300">
                <span>Call Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>

            {/* Tile 3: Email */}
            <motion.a
              href="mailto:geetdancestudio@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-dark-900/90 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-dark-950 transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-500 mb-1">WRITE TO US</p>
                <h3 className="font-heading text-base font-bold text-warm-50 mb-2 truncate">geetdancestudio@gmail.com</h3>
                <p className="text-xs text-dark-300 leading-relaxed">For collaborations, bookings & general queries</p>
              </div>
              <div className="mt-6 pt-4 border-t border-dark-800 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:text-gold-300">
                <span>Send Email</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>

            {/* Tile 4: Instagram */}
            <motion.a
              href="https://www.instagram.com/the_geetstudio?igsh=YWE4cWVyNXM4OTFu"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-2xl bg-dark-900/90 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-dark-950 transition-all duration-300">
                  <Instagram className="w-6 h-6" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gold-500 mb-1">INSTAGRAM</p>
                <h3 className="font-heading text-lg font-bold text-warm-50 mb-2">@the_geetstudio</h3>
                <p className="text-xs text-dark-300 leading-relaxed">Follow daily routines, performances & highlights</p>
              </div>
              <div className="mt-6 pt-4 border-t border-dark-800 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:text-gold-300">
                <span>Follow Us</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
