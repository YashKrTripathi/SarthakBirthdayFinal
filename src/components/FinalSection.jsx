import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './FinalSection.css';

const surpriseMessages = [
    "You thought this was just a button? NAH! 🎉 YOU'RE THE REAL GIFT, BRO! (Even if you're wrapped weird)",
    "SURPRISE! You're officially old enough to hurt yourself sleeping! 💀🎂",
    "Plot twist: The real birthday present was the friends we annoyed along the way! 🥳",
    "Breaking News: Local legend gets older, world celebrates anyway! 📰🎊",
    "Congrats! You've unlocked: ADULT MODE (bugs included, no refunds) 🎮👴",
];

export default function FinalSection() {
    const [showCake, setShowCake] = useState(false);
    const [candlesBlown, setCandlesBlown] = useState(false);
    const [showFinalMessage, setShowFinalMessage] = useState(false);

    const handleFinalCelebration = () => {
        setShowCake(true);
        setCandlesBlown(false);
        setShowFinalMessage(false);
    };

    const handleBlowCandles = () => {
        if (candlesBlown) return;
        setCandlesBlown(true);

        // Massive confetti and chocolate shower
        const duration = 5000;
        const end = Date.now() + duration;

        const chocolates = confetti.shapeFromText({ text: '🍫' });
        const sweets = confetti.shapeFromText({ text: '🍬' });
        const hearts = confetti.shapeFromText({ text: '❤️' });

        const frame = () => {
            confetti({
                particleCount: 15,
                angle: 60,
                spread: 100,
                origin: { x: 0, y: 0.6 },
                colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7', '#bf00ff'],
                shapes: ['circle', 'square', chocolates, sweets, hearts],
                scalar: 2
            });
            confetti({
                particleCount: 15,
                angle: 120,
                spread: 100,
                origin: { x: 1, y: 0.6 },
                colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7', '#bf00ff'],
                shapes: ['circle', 'square', chocolates, sweets, hearts],
                scalar: 2
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            } else {
                setShowFinalMessage(true);
            }
        };
        frame();

        // Big center bursts
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 200,
                    origin: { y: 0.5 },
                    colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7', '#bf00ff'],
                    shapes: [chocolates, sweets, hearts],
                    scalar: 3
                });
            }, i * 1000);
        }
    };

    const handleFinalConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7', '#bf00ff'],
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7', '#bf00ff'],
            });
            if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
    };

    return (
        <section className="final-section">
            <div className="final-content">
                <motion.div
                    className="final-emoji-row"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    🎂🎉🥳🎊🎈
                </motion.div>

                <motion.h2
                    className="final-title"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    HAPPY BIRTHDAY SARTHAK! 🎉
                </motion.h2>

                <motion.p
                    className="final-message"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    Okay okay, jokes aside...
                </motion.p>

                <motion.div
                    className="final-real-message"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                >
                    <p>
                        You absolute legend. SKY wouldn't be SKY without you and your
                        chaotic energy. Here's to more inside jokes, more late-night
                        conversations, more dumb plans that somehow work out, and more
                        memories that we'll laugh about forever.
                    </p>
                    <p>
                        You're not just a friend, you're the friend who makes every moment
                        10x funnier (even when you're not trying). Keep being you, bro.
                        The world needs more Sarthaks. 🫡
                    </p>
                </motion.div>

                <motion.div
                    className="final-signature"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                >
                    <p>With love and maximum chaos,</p>
                    <p className="signature-name">— Team SKY 🌟</p>
                </motion.div>

                {/* FINAL CELEBRATION BUTTON */}
                <motion.button
                    className="final-btn"
                    onClick={handleFinalCelebration}
                    whileHover={{ scale: 1.1, rotate: [-2, 2, -2, 0] }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.4 }}
                >
                    🎉 CLICK FOR FINAL CELEBRATION 🎉
                </motion.button>

                {/* Cake Experience Overlay */}
                <AnimatePresence>
                    {showCake && (
                        <motion.div
                            className="cake-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleBlowCandles}
                        >
                            <motion.div
                                className="cake-container"
                                initial={{ scale: 0, y: 100 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0, y: 100 }}
                                transition={{ type: 'spring', damping: 15 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {!candlesBlown ? (
                                    <>
                                        <div className="cake-visual">
                                            <div className="candles">
                                                <div className="candle">
                                                    <div className="flame"></div>
                                                </div>
                                                <div className="candle">
                                                    <div className="flame"></div>
                                                </div>
                                                <div className="candle">
                                                    <div className="flame"></div>
                                                </div>
                                            </div>
                                            <div className="cake-body">🎂</div>
                                        </div>
                                        <h3 className="cake-prompt">CLICK ANYWHERE TO BLOW THE CANDLES! 🕯️</h3>
                                    </>
                                ) : (
                                    <motion.div
                                        className="blown-cake-container"
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <div className="blown-cake">🎂</div>
                                        {showFinalMessage && (
                                            <motion.h1
                                                className="mega-title"
                                                initial={{ scale: 0, rotate: -10 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: 'spring', stiffness: 200 }}
                                            >
                                                HAPPY BIRTHDAY SARTHAK! 🍫✨
                                            </motion.h1>
                                        )}
                                        <button
                                            className="close-celebration"
                                            onClick={() => setShowCake(false)}
                                        >
                                            BEST BIRTHDAY EVER! 😭💖
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>



                <motion.div
                    className="final-footer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.8 }}
                >
                    <p>Made with 💀, ☕, and questionable life choices</p>
                    <p className="copyright">© SKY Productions™ — Unauthorized crying is not permitted</p>
                </motion.div>
            </div>
        </section>
    );
}
