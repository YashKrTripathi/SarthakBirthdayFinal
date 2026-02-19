import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import WishPopup from './WishPopup';
import './AchievementSection.css';

const achievements = [
    {
        icon: '🏆',
        title: 'BOSS DEFEATED',
        subtitle: 'Boss of "Dekhte Hai"',
        description: 'Minimal words, maximum ambiguity. Truly elusive.',
        rarity: 'EPIC',
        xp: '+4200 XP',
    },
    {
        icon: '🧠',
        title: 'ACHIEVEMENT UNLOCKED',
        subtitle: 'Low-Key Genius',
        description: 'Intelligent but silent. The team didn\'t even see him think.',
        rarity: 'LEGENDARY',
        xp: '+9999 XP',
    },
];

const rarityColors = {
    LEGENDARY: '#ff6600',
    EPIC: '#bf00ff',
    RARE: '#00fff7',
    MYTHIC: '#ff2d95',
};

export default function AchievementSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px -20% 0px" });
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
        if (isInView && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            setTimeout(() => {
                if (window.triggerWish_diya) {
                    window.triggerWish_diya();
                }
            }, 1000);
        }
    }, [isInView]);

    const handleAchievementClick = () => {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ff6600', '#fff01f', '#39ff14'],
        });
    };

    return (
        <section className="achievement-section" ref={sectionRef}>
            <WishPopup
                name="diya"
                image="/wishes/diya.png"
                voiceNote="/wishes/diya vn.ogg"
                side="left"
            />
            <motion.h2
                className="section-title achievement-title"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                🎮 LEVEL UP! ACHIEVEMENTS UNLOCKED 🎮
            </motion.h2>

            <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                    <motion.div
                        key={index}
                        className="achievement-card"
                        initial={{ opacity: 0, y: 80, rotateX: -20 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, type: 'spring' }}
                        whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                        onClick={handleAchievementClick}
                        style={{
                            borderColor: rarityColors[achievement.rarity],
                            boxShadow: `0 0 25px ${rarityColors[achievement.rarity]}40`,
                        }}
                    >
                        <div className="achievement-icon-wrapper">
                            <motion.span
                                className="achievement-icon"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            >
                                {achievement.icon}
                            </motion.span>
                        </div>

                        <div className="achievement-rarity" style={{ color: rarityColors[achievement.rarity] }}>
                            ★ {achievement.rarity} ★
                        </div>

                        <h3 className="achievement-card-title">{achievement.title}</h3>
                        <h4 className="achievement-card-subtitle">{achievement.subtitle}</h4>
                        <p className="achievement-card-desc">{achievement.description}</p>

                        <div className="achievement-xp" style={{ background: rarityColors[achievement.rarity] }}>
                            {achievement.xp}
                        </div>

                        <motion.div
                            className="achievement-shine"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.8 }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Stats Bar */}
            <motion.div
                className="stats-bar"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
            >
                <div className="stat-item">
                    <span className="stat-value">∞</span>
                    <span className="stat-label">Brain Cells Lost</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">404</span>
                    <span className="stat-label">Common Sense</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">Chaos Level</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">0</span>
                    <span className="stat-label">Regrets (Allegedly)</span>
                </div>
            </motion.div>
        </section>
    );
}
