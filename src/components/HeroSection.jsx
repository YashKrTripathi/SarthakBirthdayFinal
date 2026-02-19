import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import WishPopup from './WishPopup';
import './HeroSection.css';

export default function HeroSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px -10% 0px" });
    const hasExploded = useRef(false);
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
        if (isInView && !hasExploded.current) {
            hasExploded.current = true;

            // Fire confetti from both sides
            const duration = 4000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 4,
                    angle: 60,
                    spread: 80,
                    origin: { x: 0, y: 0.7 },
                    colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7', '#bf00ff'],
                });
                confetti({
                    particleCount: 4,
                    angle: 120,
                    spread: 80,
                    origin: { x: 1, y: 0.7 },
                    colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7', '#bf00ff'],
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();

            // Big center burst
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 180,
                    origin: { y: 0.5 },
                    colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7', '#bf00ff', '#ff6600'],
                });

                // Trigger Anisha's wish after the initial confetti
                setTimeout(() => {
                    if (window.triggerWish_anisha) window.triggerWish_anisha();
                }, 1000);
            }, 500);
        }
    }, [isInView]);

    const handleClick = () => {
        confetti({
            particleCount: 80,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7'],
        });
    };

    return (
        <section className="hero-section" onClick={handleClick} ref={sectionRef}>
            <WishPopup
                name="anisha"
                image="/wishes/anisha.png"
                voiceNote="/wishes/anisha vn.ogg"
                side="left"
            />
            {/* Floating emojis background */}
            <div className="floating-emojis">
                {['🎂', '🎉', '🎊', '🥳', '💀', '😂', '🔥', '🎈', '🍰', '🎁', '⚡', '👑', '🏆', '🎯'].map(
                    (emoji, i) => (
                        <motion.span
                            key={i}
                            className="floating-emoji"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 30 + 20}px`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        >
                            {emoji}
                        </motion.span>
                    )
                )}
            </div>

            {/* Breaking News Banner */}
            <motion.div
                className="breaking-news"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <span className="breaking-flash">⚡ BREAKING NEWS ⚡</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
                className="hero-title"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
            >
                HAPPY BIRTHDAY SARTHAK!
            </motion.h1>

            <motion.div
                className="hero-subtitle-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <h2 className="hero-subtitle">THE LEGEND SINCE 2006 👑</h2>
            </motion.div>

            {/* Age badge with GIFs on sides */}
            <motion.div
                className="hero-badge-with-gifs"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, type: 'spring' }}
            >
                <img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" alt="party" className="hero-gif hero-gif-left" />
                <div className="hero-age-badge">
                    <span className="age-number">20</span>
                    <span className="age-text">YEARS OF CHAOS</span>
                </div>
                <img src="https://media.giphy.com/media/g9582DNuQppxC/giphy.gif" alt="celebration" className="hero-gif hero-gif-right" />
            </motion.div>

            <motion.p
                className="hero-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                The internet was NOT ready for this moment
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <span>👇 SCROLL FOR MORE CHAOS 👇</span>
            </motion.div>
        </section>
    );
}
