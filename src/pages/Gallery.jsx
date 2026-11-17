import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import PageTransition from '../components/ui/PageTransition';
import { galleryCategories, galleryImages } from '../data/gallery';
import { api } from '../utils/api';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [galleryRecords, setGalleryRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api.get('/api/gallery')
      .then((res) => {
        if (cancelled) return;
        if (res?.success && Array.isArray(res.data)) {
          if (res.data.length > 0) {
            // 1. API Succeeded with records -> Display MongoDB records
            setGalleryRecords(res.data.map((item) => ({
              ...item,
              id: item._id,
              src: item.mediaUrl,
              alt: item.title,
              mediaType: item.mediaType || 'image',
              category: item.category || 'dance',
            })));
          } else {
            // 2. API Succeeded with empty array -> Display empty state (Do NOT show static fallbacks)
            setGalleryRecords([]);
          }
        } else {
          // Unexpected payload -> fallback to static images
          setGalleryRecords(galleryImages);
        }
      })
      .catch(() => {
        // 3. Network or server error -> Preserve existing static fallback behavior
        if (!cancelled) {
          setGalleryRecords(galleryImages);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  const filteredImages =
    activeCategory === 'all'
      ? galleryRecords
      : galleryRecords.filter((img) => {
          const cat = (img.category || '').toLowerCase();
          const title = (img.title || img.alt || '').toLowerCase();
          const type = (img.mediaType || '').toLowerCase();
          const target = activeCategory.toLowerCase();
          return cat.includes(target) || title.includes(target) || type.includes(target);
        });

  return (
    <PageTransition>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 bg-dark-950 border-b border-dark-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 font-bold text-xs uppercase tracking-widest mb-6">
            GALLERY
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 tracking-tight text-warm-50">
            See Geet <span className="text-gold-500 font-light italic">in Motion.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-sm md:text-base opacity-80 leading-relaxed mb-8">
            A collection of moments from the people, performances, classes, workshops, and experiences that make Geet what it is.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gold-500 text-dark-950 shadow-md'
                    : 'bg-dark-800 text-dark-200 hover:text-warm-50 border border-dark-700 hover:border-gold-500/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block p-6 rounded-2xl bg-dark-900/60 border border-dark-800 text-xs text-dark-300 animate-pulse">
                Loading gallery moments...
              </div>
            </div>
          ) : galleryRecords.length === 0 ? (
            <div className="py-20 text-center max-w-lg mx-auto">
              <div className="p-8 rounded-3xl bg-dark-900/60 border border-dark-800 backdrop-blur-sm">
                <p className="font-heading text-xl font-bold text-warm-50 mb-2">No Gallery Highlights Published Yet</p>
                <p className="text-xs text-dark-300 leading-relaxed">
                  New performance moments, event showcases, and studio highlights will be featured here soon. Check back shortly!
                </p>
              </div>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto">
              <div className="p-6 rounded-2xl bg-dark-900/40 border border-dark-800">
                <p className="text-sm font-semibold text-warm-50 mb-1">No media in "{activeCategory}" category</p>
                <p className="text-xs text-dark-300 mb-4">Try selecting another category or view all moments.</p>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="px-4 py-2 bg-gold-500 text-dark-950 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gold-400 transition-colors cursor-pointer"
                >
                  View All Moments
                </button>
              </div>
            </div>
          ) : (
            /* Masonry-style grid */
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredImages.map((img, i) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="break-inside-avoid cursor-pointer group relative overflow-hidden"
                    onClick={() => setLightboxImage(img)}
                  >
                    {img.mediaType === 'video' ? (
                      <video src={img.src} controls className="w-full object-contain bg-black transition-transform duration-500 group-hover:scale-105" style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '4/3' }} />
                    ) : (
                      <img src={img.src} alt={img.alt} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '4/3' }} />
                    )}
                    <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/40 transition-all duration-300 flex items-end p-4">
                      <p className="text-sm text-warm-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                        {img.alt}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-lg"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-warm-50 hover:text-gold-500 transition-colors z-10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightboxImage.src.replace('w=600', 'w=1200')}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
