import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from '../cards/TestimonialCard';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-dark-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Voices from the Studio"
          subtitle="Hear from our community of dancers"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
