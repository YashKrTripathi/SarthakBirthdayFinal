import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import WishPopup from './WishPopup';
import './PhotoMemories.css';

const memories = [
    {
        image: '/Timeline/The Beginning 👶.jpg',
        caption: 'Baby Sarthak',
        roast: 'Already plotting world domination',
        year: '2006',
        rotation: -8,
    },
    {
        image: '/Timeline/Chaos Unlocked 🚶.jpg',
        caption: 'Chaos Mode: ON',
        roast: 'Main character energy since day 1',
        year: '2010',
        rotation: 5,
    },
    {
        image: '/Timeline/The Menace Phase 😈.jpg',
        caption: 'The Menace',
        roast: 'Teachers still have PTSD',
        year: '2014',
        rotation: -4,
    },
    {
        image: '/Timeline/The Awkward Years 🤓.jpg',
        caption: 'The Awkward Era',
        roast: 'We don\'t talk about this phase',
        year: '2018',
        rotation: 7,
    },
    {
        image: '/Timeline/The Glow Up.jpeg',
        caption: 'Glow Up Loading...',
        roast: 'Coffee addiction: Unlocked',
        year: '2022',
        rotation: -6,
    },
    {
        image: '/Timeline/THE LEGEND 👑.jpeg',
        caption: 'THE LEGEND',
        roast: 'Same chaos, premium packaging',
        year: '2026',
        rotation: 3,
    },
];

export default function PhotoMemories() {
    const sectionRef = useRef(null);
    const middleCardRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px -20% 0px" });
    const isMiddleInView = useInView(middleCardRef, { once: true, margin: "-50px" });
    const hasTriggeredDiyaRef = useRef(false);
    const hasTriggeredRutulRef = useRef(false);

    useEffect(() => {
        if (isInView && !hasTriggeredRutulRef.current) {
            hasTriggeredRutulRef.current = true;
            setTimeout(() => {
                if (window.triggerWish_rutul) {
                    window.triggerWish_rutul();
                }
            }, 1000);
        }
    }, [isInView]);



    const handlePhotoClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 30,
            spread: 60,
            origin: { x, y },
            colors: ['#ff2d95', '#00fff7', '#fff01f', '#39ff14'],
        });
    };

    return (
        <section className="photo-memories-section" ref={sectionRef}>
            <WishPopup
                name="rutul"
                image="/wishes/rutul.png"
                voiceNote="/wishes/rutul vn.ogg"
                side="right"
            />

            <motion.h2
                className="section-title memories-title"
                initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                📸 SARTHAK THROUGH THE AGES 📸
            </motion.h2>

            <motion.p
                className="memories-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                A chaotic journey from baby to... slightly taller baby
            </motion.p>

            <div className="polaroid-wall">
                {memories.map((memory, index) => (
                    <motion.div
                        key={index}
                        ref={index === 3 ? middleCardRef : null}
                        className="polaroid-card"
                        style={{ '--rotation': `${memory.rotation}deg` }}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            rotate: memory.rotation - 20,
                            y: 100
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            rotate: memory.rotation,
                            y: 0
                        }}
                        viewport={{ once: true }}
                        transition={{
                            delay: index * 0.15,
                            type: 'spring',
                            stiffness: 120
                        }}
                        whileHover={{
                            scale: 1.15,
                            rotate: 0,
                            zIndex: 10,
                            boxShadow: '0 20px 40px rgba(255, 45, 149, 0.4)'
                        }}
                        onClick={handlePhotoClick}
                    >
                        <div className="polaroid-image-wrapper">
                            <img
                                src={memory.image}
                                alt={memory.caption}
                                className="polaroid-image"
                            />
                        </div>
                        <div className="polaroid-caption">
                            <span className="caption-title">{memory.caption}</span>
                            <span className="caption-roast">{memory.roast}</span>
                        </div>
                        <div className="polaroid-tape"></div>
                        <div className="polaroid-sticker">
                            {['🔥', '💀', '😭', '🤡', '👑', '✨'][index]}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="memories-footer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
            >
                <span className="footer-text">Click any photo for a surprise! 🎉</span>
            </motion.div>
        </section>
    );
}
