import { useState, useCallback, useEffect } from 'react';
import WhatsAppIntro from './components/WhatsAppIntro';
import HeroSection from './components/HeroSection';
import TickerBanner from './components/TickerBanner';
import AchievementSection from './components/AchievementSection';
import MemeWall from './components/MemeWall';
import PhotoMemories from './components/PhotoMemories';
import FinalSection from './components/FinalSection';
import RandomPopups from './components/RandomPopups';
import CursorEffects from './components/CursorEffects';
import SarthakCharacter from './components/characters/SarthakCharacter';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introFadingOut, setIntroFadingOut] = useState(false);

  // Hide scrollbar during intro, show after
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Scroll to top when main content shows
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showIntro]);

  const handleIntroComplete = useCallback(() => {
    console.log('handleIntroComplete called! Starting transition...');
    setIntroFadingOut(true);
    // Wait for fade animation then remove intro
    setTimeout(() => {
      console.log('Removing intro, showing main content');
      setShowIntro(false);
    }, 500);
  }, []);

  return (
    <>
      {/* Main Content - always rendered but hidden initially */}
      <div style={{
        opacity: showIntro ? 0 : 1,
        transition: 'opacity 0.5s ease-in',
        pointerEvents: showIntro ? 'none' : 'auto',
        height: showIntro ? '0' : 'auto',
        overflow: showIntro ? 'hidden' : 'visible'
      }}>
        <CursorEffects />
        <RandomPopups />
        <SarthakCharacter />
        <HeroSection />
        <TickerBanner />
        <AchievementSection />
        {/* <RoastSection /> removed as requested */}
        <PhotoMemories />
        <MemeWall />
        <FinalSection />
      </div>

      {/* WhatsApp Intro Overlay */}
      {showIntro && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#000',
          opacity: introFadingOut ? 0 : 1,
          transition: 'opacity 0.5s ease-out'
        }}>
          <WhatsAppIntro onComplete={handleIntroComplete} />
        </div>
      )}
    </>
  );
}

export default App;
