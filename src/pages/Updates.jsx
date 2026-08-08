import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import { updates } from '../data/updates';

const typeColors = {
  workshop: 'bg-gold-500',
  class: 'bg-rose-accent',
  event: 'bg-blue-400',
};

export default function Updates() {
  return (
    <PageTransition>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="What's New at Geet"
            subtitle="Stay updated with the latest from our studio"
          />
        </div>
      </section>

      <section className="pb-20 md:pb-32 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-dark-600" />

            <div className="space-y-8">
              {updates.map((update, i) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative pl-12 md:pl-20"
                >
                  {/* Dot */}
                  <div className={`absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full ${typeColors[update.type] || 'bg-gold-500'} ring-4 ring-dark-900`} />

                  {/* Date */}
                  <p className="font-heading text-lg md:text-xl font-bold text-warm-100 mb-1">
                    {update.date}
                  </p>

                  {/* Card */}
                  <Link
                    to={update.link}
                    className="group block bg-dark-800 border border-dark-600 hover:border-dark-400 p-5 transition-all duration-300"
                  >
                    <h3 className="font-heading text-lg font-bold text-warm-50 mb-2 group-hover:text-gold-500 transition-colors">
                      {update.title}
                    </h3>
                    <p className="text-sm text-dark-200 mb-3">{update.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-gold-500">
                      {update.cta}
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
