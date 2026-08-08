import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Instagram } from '../components/icons/Instagram';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';

const instructors = [
  {
    name: 'Priya Sharma',
    specialty: 'Bollywood & Classical',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
    bio: 'Award-winning Bollywood choreographer with 10+ years of experience in film and stage productions across Mumbai and Indore.'
  },
  {
    name: 'Arjun Mehra',
    specialty: 'Hip-Hop & Street Dance',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Street dance specialist and battle champion. Arjun brings raw energy, popping and locking basics, and community groove training to Geet Studio.'
  },
  {
    name: 'Meera Joshi',
    specialty: 'Contemporary & Jazz',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Trained at London Contemporary Dance School. Meera focuses on floor work, release techniques, and helping dancers express raw emotions.'
  },
  {
    name: 'Carlos Rodriguez',
    specialty: 'Salsa & Bachata',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Hailing from Cuba, Carlos has taught Latin social dancing across Europe and India, specializing in partner connection, rhythms, and shines.'
  }
];

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1920&q=80"
          alt="About Geet Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/30" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-warm-50">About Us</h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-4">Our Story</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-warm-50 mb-6">
              Born from a Love of Movement
            </h2>
            <div className="space-y-4 text-dark-200 leading-relaxed text-lg">
              <p>
                Geet Studio was founded with a simple belief: dance is for everyone. What began as a small
                practice room in the heart of Indore has grown into a vibrant community of over 500 dancers,
                united by their love for movement and expression.
              </p>
              <p>
                Our name, "Geet" — meaning song or melody — reflects our philosophy that dance is music made
                visible. Every step, every gesture, every movement is a note in a larger composition that tells
                your unique story.
              </p>
              <p>
                Today, Geet Studio offers classes in six distinct dance styles, hosts regular workshops with
                guest instructors, and produces performances that have become landmarks in Indore's cultural calendar.
                But at our core, we remain what we've always been: a space where people come to discover the
                dancer within.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 md:px-8 bg-dark-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Mission',
              text: 'To make quality dance education accessible to everyone in central India, creating a space where technique and artistry grow together.',
            },
            {
              title: 'Philosophy',
              text: 'We believe every person has a natural dancer inside them. Our role is not to impose movement, but to unlock the expression that already exists within.',
            },
            {
              title: 'Community',
              text: 'Geet Studio is more than a dance school — it\'s a family. We celebrate each other\'s growth, support each other\'s journeys, and dance together.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-dark-800 border border-dark-600 p-8"
            >
              <h3 className="font-heading text-xl font-bold text-gold-500 mb-4">{item.title}</h3>
              <p className="text-dark-200 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder / Owner */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-dark-700">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >
            <div className="aspect-square overflow-hidden border border-dark-600 rounded-lg group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80"
                alt="Geetanjali 'Geet' Sen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              />
            </div>
            <div className="md:col-span-2">
              <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">Owner & Artistic Director</p>
              <h3 className="font-heading text-2xl font-bold text-warm-50 mb-4">Geetanjali "Geet" Sen</h3>
              <p className="text-dark-200 leading-relaxed mb-4">
                A disciple of legendary classical gurus and trained in contemporary dance at international conservatories, 
                Geetanjali Sen founded Geet Studio to make Indore a hub for professional dance education in Central India. 
                She believes that technique is the language of freedom and movement is the truest expression of the soul.
              </p>
              <p className="text-sm text-dark-300 leading-relaxed italic">
                "We do not teach you how to copy steps; we teach you how to feel the music and craft your own movements."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Teachers / Instructors */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-4">Our Faculty</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-warm-50">Meet the Instructors</h2>
            <div className="h-px w-16 bg-gold-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((teacher, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-dark-800 border border-dark-600 p-6 text-center group hover:border-gold-500 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-dark-600 group-hover:border-gold-500 transition-all duration-500">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-warm-50 mb-1 group-hover:text-gold-500 transition-colors">
                    {teacher.name}
                  </h4>
                  <p className="text-xs text-gold-500 uppercase tracking-widest mb-3">
                    {teacher.specialty}
                  </p>
                  <p className="text-sm text-dark-200 leading-relaxed">
                    {teacher.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-4 md:px-8 bg-dark-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-4">Visit Us</p>
            <h3 className="font-heading text-2xl font-bold text-warm-50 mb-6">Our Studio</h3>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-dark-200">
                <MapPin className="w-4 h-4 text-gold-500" />
                Geet Studio, Vijay Nagar, Indore, Madhya Pradesh
              </div>
              <div className="flex items-center gap-2 text-dark-200">
                <Phone className="w-4 h-4 text-gold-500" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-2 text-dark-200">
                <Mail className="w-4 h-4 text-gold-500" />
                hello@geetstudio.in
              </div>
              <a href="https://instagram.com/geetstudio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-dark-200 hover:text-gold-500 transition-colors">
                <Instagram className="w-4 h-4 text-gold-500" />
                @geetstudio
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
