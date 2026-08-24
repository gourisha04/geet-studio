import { motion } from 'framer-motion';
import { Instagram } from '../icons/Instagram';

const instagramImages = [
  'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80',
  'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=400&q=80',
  'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&q=80',
  'https://images.unsplash.com/photo-1547153760-18fc86c498c2?w=400&q=80',
  'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
];

export default function InstagramFeed() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-4">Instagram</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-warm-50 mb-4">
            Follow the Movement
          </h2>
          <div className="h-px w-16 bg-gold-500 mx-auto" />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {instagramImages.map((img, i) => (
          <motion.a
            key={i}
            href="https://www.instagram.com/the_geetstudio?igsh=YWE4cWVyNXM4OTFu"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group relative aspect-square overflow-hidden"
          >
            <img
              src={img}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/60 transition-all duration-300 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-warm-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href="https://www.instagram.com/the_geetstudio?igsh=YWE4cWVyNXM4OTFu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gold-500 uppercase tracking-widest hover:text-gold-400 transition-colors duration-300"
        >
          <Instagram className="w-4 h-4" />
          Follow @the_geetstudio
        </a>
      </div>
    </section>
  );
}
