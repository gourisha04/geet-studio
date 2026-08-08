import SectionHeading from '../ui/SectionHeading';
import ClassCard from '../cards/ClassCard';
import Button from '../ui/Button';
import { classes } from '../../data/classes';

export default function UpcomingClasses() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Upcoming Classes"
          subtitle="Start your journey with a class that matches your rhythm"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.slice(0, 3).map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button to="/classes" variant="outline" size="lg" withArrow>
            View All Classes
          </Button>
        </div>
      </div>
    </section>
  );
}
