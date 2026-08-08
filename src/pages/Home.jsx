import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeAnimation from '../components/intro/WelcomeAnimation';
import DailyUpdate from '../components/intro/DailyUpdate';
import UpcomingEventsModal from '../components/intro/UpcomingEventsModal';
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import DanceStyles from '../components/home/DanceStyles';
import UpcomingClasses from '../components/home/UpcomingClasses';
import WorkshopsPreview from '../components/home/WorkshopsPreview';
import EventsPreview from '../components/home/EventsPreview';
import Testimonials from '../components/home/Testimonials';
import InstagramFeed from '../components/home/InstagramFeed';

export default function Home() {
  const [introPhase, setIntroPhase] = useState(() => {
    return sessionStorage.getItem('geet_intro_played') ? 2 : 0;
  });
  const [showEventsModal, setShowEventsModal] = useState(false);

  const handleWelcomeComplete = useCallback(() => {
    setIntroPhase(1);
  }, []);

  const handleDailyComplete = useCallback(() => {
    sessionStorage.setItem('geet_intro_played', 'true');
    setIntroPhase(2);
    setTimeout(() => setShowEventsModal(true), 800);
  }, []);

  return (
    <>
      {/* Intro Sequence */}
      <AnimatePresence mode="wait">
        {introPhase === 0 && (
          <WelcomeAnimation key="welcome" onComplete={handleWelcomeComplete} />
        )}
        {introPhase === 1 && (
          <DailyUpdate key="daily" onComplete={handleDailyComplete} />
        )}
      </AnimatePresence>

      {/* Events Modal */}
      <AnimatePresence>
        {showEventsModal && (
          <UpcomingEventsModal
            isOpen={showEventsModal}
            onClose={() => setShowEventsModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div>
        <Hero />
        <AboutPreview />
        <DanceStyles />
        <UpcomingClasses />
        <WorkshopsPreview />
        <EventsPreview />
        <Testimonials />
        <InstagramFeed />
      </div>
    </>
  );
}
