import PageTransition from '../components/ui/PageTransition';
import ReachUsSection from '../components/home/ReachUsSection';

export default function Contact() {
  return (
    <PageTransition>
      <div className="pt-24 md:pt-28">
        <ReachUsSection />
      </div>
    </PageTransition>
  );
}

