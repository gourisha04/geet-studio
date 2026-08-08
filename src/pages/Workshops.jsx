import SectionHeading from '../components/ui/SectionHeading';
import WorkshopCard from '../components/cards/WorkshopCard';
import PageTransition from '../components/ui/PageTransition';
import { workshops } from '../data/workshops';

export default function Workshops() {
  return (
    <PageTransition>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Workshops"
            subtitle="Intensive learning experiences with master instructors"
          />
        </div>
      </section>

      <section className="pb-20 md:pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {workshops.map((workshop, i) => (
            <WorkshopCard key={workshop.id} workshop={workshop} featured={i === 0} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
