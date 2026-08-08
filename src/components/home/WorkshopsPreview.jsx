import SectionHeading from '../ui/SectionHeading';
import WorkshopCard from '../cards/WorkshopCard';
import Button from '../ui/Button';
import { workshops } from '../../data/workshops';

export default function WorkshopsPreview() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-dark-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Upcoming Workshops"
          subtitle="Intensive learning experiences with master instructors"
        />

        <div className="space-y-6">
          {workshops.slice(0, 2).map((workshop, i) => (
            <WorkshopCard key={workshop.id} workshop={workshop} featured={i === 0} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button to="/workshops" variant="outline" size="lg" withArrow>
            View All Workshops
          </Button>
        </div>
      </div>
    </section>
  );
}
