import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Instagram } from '../icons/Instagram';
import { api } from '../../utils/api';

export default function InstagramFeed() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    api.get('/api/gallery').then((res) => {
      if (res?.success && Array.isArray(res.data)) setGalleryItems(res.data.slice(0, 6));
    }).catch(() => {});
  }, []);

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
        {galleryItems.map((item, i) => (
          <motion.a
            key={item._id}
            href="https://www.instagram.com/the_geetstudio?igsh=YWE4cWVyNXM4OTFu"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group relative aspect-square overflow-hidden"
          >
            {item.mediaType === 'video' ? (
              <video src={item.mediaUrl} muted playsInline className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : (
              <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            )}
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
