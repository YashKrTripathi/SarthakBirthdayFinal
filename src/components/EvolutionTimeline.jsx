import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import WishPopup from './WishPopup';
import './EvolutionTimeline.css';

const evolutionStages = [
    {
        year: '2006',
        age: 'Baby Era',
        title: 'The Beginning 👶',
        description: 'A wild creature was born. The world was not prepared.',
        image: '/Timeline/The Beginning 👶.jpg',
        emoji: '🍼',
        funFact: 'Probably cried more than he does now. Probably.',
    },
    {
        year: '2010',
        age: 'Toddler Era',
        title: 'Chaos Unlocked 🚶',
        description: 'Started walking, started talking, started annoying everyone.',
        image: '/Timeline/Chaos Unlocked 🚶.jpg',
        emoji: '👣',
        funFact: 'Already had main character energy.',
    },
    {
        year: '2014',
        age: 'Kid Era',
        title: 'The Menace Phase 😈',
        description: 'Peak mischief. Teachers feared this child.',
        image: '/Timeline/The Menace Phase 😈.jpg',
        emoji: '🎒',
        funFact: 'Homework? Never heard of her.',
    },
    {
        year: '2018',
        age: 'Teen Era',
        title: 'The Awkward Years 🤓',
        description: 'Voice cracking, questionable haircuts, zero game.',
        image: '/Timeline/The Awkward Years 🤓.jpg',
        emoji: '📱',
        funFact: 'Thought he was cool. He was not.',
    },
    {
        year: '2022',
        age: 'Young Adult Era',
        title: 'The Glow Up? 💅',
        description: 'Still figuring life out but now with more coffee.',
        image: '/Timeline/The Glow Up.jpeg',
        emoji: '☕',
        funFact: 'Sleep schedule: Does not exist.',
    },
    {
        year: '2026',
        age: 'Present Day',
        title: 'THE LEGEND 👑',
        description: 'Officially 20! Same chaos, just legally allowed to do more stuff.',
        image: '/Timeline/THE LEGEND 👑.jpeg',
        emoji: '🎂',
        funFact: 'Still the same dude. Just older.',
    },
];

export default function EvolutionTimeline() {
    const sectionRef = useRef(null);
    const awkwardCardRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const isAwkwardInView = useInView(awkwardCardRef, { once: true, margin: "-50px" });
    const hasTriggeredDiyaRef = useRef(false);
    const hasTriggeredRutulRef = useRef(false);

    useEffect(() => {
        if (isInView && !hasTriggeredDiyaRef.current) {
            hasTriggeredDiyaRef.current = true;
        }
    }, [isInView]);

    useEffect(() => {
        if (isAwkwardInView && !hasTriggeredRutulRef.current) {
            hasTriggeredRutulRef.current = true;
        }
    }, [isAwkwardInView]);

    return (
        <section className="evolution-section" ref={sectionRef}>
            <motion.h2
                className="section-title evolution-title"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                🧬 EVOLUTION OF THIS CREATURE 🧬
            </motion.h2>

            <motion.p
                className="evolution-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                From a tiny human to this absolute legend (debatable)
            </motion.p>

            <div className="timeline-container">
                <div className="timeline-line" />

                {evolutionStages.map((stage, index) => (
                    <motion.div
                        key={index}
                        ref={index === 3 ? awkwardCardRef : null}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: 'spring', stiffness: 80 }}
                    >
                        {/* LEFT side content */}
                        <div className="timeline-left-side">
                            {index % 2 === 0 ? (
                                <motion.div className="timeline-card" whileHover={{ scale: 1.02 }}>
                                    <div className="timeline-year-badge">{stage.year}</div>
                                    <div className="timeline-content">
                                        <span className="timeline-age">{stage.age}</span>
                                        <h3 className="timeline-card-title">{stage.title}</h3>
                                        <p className="timeline-description">{stage.description}</p>
                                        <div className="timeline-funfact">
                                            <span className="funfact-label">💭 Fun Fact:</span>
                                            <span className="funfact-text">{stage.funFact}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                stage.image && (
                                    <motion.div className="timeline-image-side" whileHover={{ scale: 1.05, rotate: -2 }}>
                                        <img src={stage.image} alt={stage.title} />
                                    </motion.div>
                                )
                            )}
                        </div>

                        {/* CENTER - Emoji dot on line */}
                        <motion.div
                            className="timeline-dot"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + 0.2, type: 'spring' }}
                            whileHover={{ scale: 1.2 }}
                        >
                            {stage.emoji}
                        </motion.div>

                        {/* RIGHT side content */}
                        <div className="timeline-right-side">
                            {index % 2 === 0 ? (
                                stage.image && (
                                    <motion.div className="timeline-image-side" whileHover={{ scale: 1.05, rotate: 2 }}>
                                        <img src={stage.image} alt={stage.title} />
                                    </motion.div>
                                )
                            ) : (
                                <motion.div className="timeline-card" whileHover={{ scale: 1.02 }}>
                                    <div className="timeline-year-badge">{stage.year}</div>
                                    <div className="timeline-content">
                                        <span className="timeline-age">{stage.age}</span>
                                        <h3 className="timeline-card-title">{stage.title}</h3>
                                        <p className="timeline-description">{stage.description}</p>
                                        <div className="timeline-funfact">
                                            <span className="funfact-label">💭 Fun Fact:</span>
                                            <span className="funfact-text">{stage.funFact}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="evolution-footer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
            >
                <p>🎬 What a journey. What a creature. What a legend. 🎬</p>
            </motion.div>
        </section>
    );
}
