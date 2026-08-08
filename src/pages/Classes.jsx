import SectionHeading from '../components/ui/SectionHeading';
import ClassCard from '../components/cards/ClassCard';
import PageTransition from '../components/ui/PageTransition';
import { classes } from '../data/classes';

export default function Classes() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Classes"
            subtitle="Find the perfect class to begin or continue your dance journey"
          />
        </div>
      </section>

      {/* Listing */}
      <section className="pb-20 md:pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classData) => (
              <ClassCard key={classData.id} classData={classData} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
