import SectionHeading from '../components/ui/SectionHeading';
import DanceStyleCard from '../components/cards/DanceStyleCard';
import PageTransition from '../components/ui/PageTransition';
import { danceStyles } from '../data/danceStyles';

export default function DanceStylesPage() {
  return (
    <PageTransition>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Dance Styles"
            subtitle="Six distinct styles, one shared passion for dance"
          />
        </div>
      </section>

      <section className="pb-20 md:pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {danceStyles.map((style, i) => (
            <DanceStyleCard key={style.id} style={style} index={i} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
