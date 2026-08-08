import SectionHeading from '../components/ui/SectionHeading';
import EventCard from '../components/cards/EventCard';
import PageTransition from '../components/ui/PageTransition';
import { upcomingEvents, pastEvents } from '../data/events';

export default function Events() {
  return (
    <PageTransition>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Events"
            subtitle="Performances, showcases, and celebrations of dance"
          />
        </div>
      </section>

      <section className="pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-heading text-xl font-bold text-warm-50 mb-6">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-heading text-xl font-bold text-warm-50 mb-6 mt-12">Past Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
