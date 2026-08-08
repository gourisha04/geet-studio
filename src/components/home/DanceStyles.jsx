import SectionHeading from '../ui/SectionHeading';
import DanceStyleCard from '../cards/DanceStyleCard';
import { danceStyles } from '../../data/danceStyles';

export default function DanceStyles() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-dark-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Find Your Movement"
          subtitle="Six distinct styles, one shared passion for dance"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {danceStyles.map((style, i) => (
            <DanceStyleCard key={style.id} style={style} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
