import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import EventCard from '../cards/EventCard';
import Button from '../ui/Button';
import { upcomingEvents, pastEvents } from '../../data/events';

export default function EventsPreview() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Events"
          subtitle="Performances, showcases, and celebrations of dance"
        />

        {/* Upcoming */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Past events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-xl md:text-2xl font-bold text-warm-50 mb-6">
            Past Events
          </h3>

          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} variant="horizontal" />
            ))}
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <Button to="/events" variant="outline" size="lg" withArrow>
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
