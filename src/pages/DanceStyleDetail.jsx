import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDanceStyleById } from '../data/danceStyles';
import { classes } from '../data/classes';
import ClassCard from '../components/cards/ClassCard';
import Button from '../components/ui/Button';
import PageTransition from '../components/ui/PageTransition';

export default function DanceStyleDetail() {
  const { id } = useParams();
  const style = getDanceStyleById(id);

  if (!style) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-warm-50 mb-4">Style Not Found</h1>
            <Button to="/dance-styles" variant="outline">Back to Dance Styles</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const relatedClasses = classes.filter((c) => style.relatedClasses.includes(c.id));

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[450px] flex items-end overflow-hidden">
        <img src={style.image} alt={style.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-dark-900/20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-12 h-1 mb-4" style={{ backgroundColor: style.color }} />
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-warm-50 mb-3">
              {style.name}
            </h1>
            <p className="font-editorial text-xl italic text-warm-200">{style.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <p className="font-editorial text-xl md:text-2xl italic text-dark-200 mb-8 leading-relaxed">
              {style.description}
            </p>
            <p className="text-dark-200 leading-relaxed mb-12 text-lg">
              {style.longDescription}
            </p>
          </motion.div>

          {/* Related Classes */}
          {relatedClasses.length > 0 && (
            <div className="mt-16">
              <h3 className="font-heading text-2xl font-bold text-warm-50 mb-8">
                {style.name} Classes at Geet Studio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedClasses.map((c) => (
                  <ClassCard key={c.id} classData={c} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button to="/classes" variant="outline" size="lg" withArrow>
              View All Classes
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
