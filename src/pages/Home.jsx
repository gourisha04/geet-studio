import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeAnimation from '../components/intro/WelcomeAnimation';
import DailyUpdate from '../components/intro/DailyUpdate';
import UpcomingEventsModal from '../components/intro/UpcomingEventsModal';
import Hero from '../components/home/Hero';
import ServicesSection from '../components/home/ServicesSection';
import CommunitySection from '../components/home/CommunitySection';
import CommunityQueryPopup from '../components/home/CommunityQueryPopup';
import ReachUsSection from '../components/home/ReachUsSection';
import AboutPreview from '../components/home/AboutPreview';
import InstagramFeed from '../components/home/InstagramFeed';

export default function Home() {
  const [introPhase, setIntroPhase] = useState(() => {
    return sessionStorage.getItem('geet_intro_played') ? 2 : 0;
  });
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [showQueryPopup, setShowQueryPopup] = useState(false);
  const queryPopupShown = useRef(false);

  const handleWelcomeComplete = useCallback(() => {
    setIntroPhase(1);
  }, []);

  const handleDailyComplete = useCallback(() => {
    sessionStorage.setItem('geet_intro_played', 'true');
    setIntroPhase(2);
    setTimeout(() => setShowEventsModal(true), 800);
  }, []);

  // Called when user scrolls past the Community section toward About
  const handleCommunityReachEnd = useCallback(() => {
    if (!queryPopupShown.current && !sessionStorage.getItem('geet_query_popup_shown')) {
      queryPopupShown.current = true;
      sessionStorage.setItem('geet_query_popup_shown', 'true');
      setShowQueryPopup(true);
    }
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

      {/* Upcoming Events Modal */}
      <AnimatePresence>
        {showEventsModal && (
          <UpcomingEventsModal
            isOpen={showEventsModal}
            onClose={() => setShowEventsModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Community Query Popup */}
      <AnimatePresence>
        {showQueryPopup && (
          <CommunityQueryPopup
            isOpen={showQueryPopup}
            onClose={() => setShowQueryPopup(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content — Updated homepage flow */}
      <div>
        {/* 1. Video Hero */}
        <Hero />

        {/* 2. Services (Dance, Music, Fitness, Events & Productions) */}
        <ServicesSection />

        {/* 3. Community (Major independent section) */}
        <CommunitySection onReachEnd={handleCommunityReachEnd} />

        {/* 4. About Preview (moved after Community) */}
        <AboutPreview />

        {/* 5. Query / Reach Us */}
        <ReachUsSection />

        {/* 7. Instagram Feed */}
        <InstagramFeed />
      </div>
    </>
  );
}
