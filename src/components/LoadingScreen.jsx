import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const loadingTexts = [
  "Downloading Sarthak's embarrassing photos...",
  "Loading 9999+ memes...",
  "Preparing maximum chaos...",
  "Contacting NASA for birthday confirmation...",
  "Hacking into SKY group chat...",
  "Buffering Sarthak's remaining brain cells...",
  "Installing birthday.exe...",
  "Generating roasts... please wait...",
  "Summoning the birthday gods...",
  "Almost there... or is it? 💀",
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        // Random progress jumps for comedy
        const jump = Math.random() * 8 + 1;
        return Math.min(prev + jump, 100);
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1500);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div
      className={`loading-screen ${glitch ? 'glitch' : ''}`}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="loading-emoji"
        animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎂
      </motion.div>

      <h1 className="loading-title">
        <span className="loading-title-text">PREPARING CHAOS</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ...
        </motion.span>
      </h1>

      <div className="progress-container">
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            style={{ width: `${progress}%` }}
            animate={{
              background: [
                'linear-gradient(90deg, #ff2d95, #ff6600)',
                'linear-gradient(90deg, #39ff14, #00fff7)',
                'linear-gradient(90deg, #bf00ff, #ff2d95)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <span className="progress-text">{Math.floor(progress)}%</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={textIndex}
          className="loading-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {loadingTexts[textIndex]}
        </motion.p>
      </AnimatePresence>

      <motion.p
        className="loading-warning"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ⚠️ Side effects may include: uncontrollable laughter, cringe, and existential crisis
      </motion.p>
    </motion.div>
  );
}
