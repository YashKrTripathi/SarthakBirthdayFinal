import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import WishPopup from './WishPopup';
import './MemeWall.css';

const memeGifs = [
    {
        url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
        caption: 'When SKY says "let\'s meet at 7"',
    },
    {
        url: '/singles-kid.jpg.jpeg',
        caption: 'Sarthak checking his phone at 3 AM',
    },
    {
        url: '/3d-chashma.jpg.jpeg',
        caption: '3D chashma dekha hai kabhi? 😎',
    },
    {
        url: '/systemmmm.jpg.jpeg',
        caption: 'Systemmmmm 🔥',
    },
    {
        url: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
        caption: 'Birthday boy realizing he\'s getting old',
    },
    {
        url: 'https://media.giphy.com/media/3oEjI67Egb8G9jqs3m/giphy.gif',
        caption: 'The group chat when Sarthak says something smart',
    },
    {
        url: 'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
        caption: 'SKY group celebrating Sarthak\'s birthday',
    },
    {
        url: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
        caption: 'When the birthday cake arrives',
    },
];

// Funny photos of Sarthak
const photoSlots = [
    { image: '/funny photos/img70.jpg', caption: 'Peak comedy right here 🤪', emoji: '🤪' },
    { image: '/funny photos/img74.jpg', caption: 'That embarrassing moment 😭', emoji: '😭' },
    { image: '/funny photos/img80.jpg', caption: 'The "candid" disaster 💀', emoji: '💀' },
    { image: '/funny photos/img90.jpg', caption: 'His most confused face ever 🤔', emoji: '🤔' },
];

export default function MemeWall() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px -20% 0px" });
    const hasTriggeredRef = useRef(false);

    useEffect(() => {
        if (isInView && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            setTimeout(() => {
                if (window.triggerWish_riya) {
                    window.triggerWish_riya();
                }
            }, 1000);
        }
    }, [isInView]);

    return (
        <section className="meme-wall-section" ref={sectionRef}>
            <WishPopup
                name="riya"
                image="/wishes/riya.png"
                voiceNote="/wishes/riya vn.ogg"
                side="right"
            />
            <motion.h2
                className="section-title meme-title"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                💀 THE MEME WALL OF FAME 💀
            </motion.h2>

            <motion.p
                className="meme-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                Every GIF carefully curated to describe Sarthak's life
            </motion.p>

            {/* Upload Your Photos Section */}
            <motion.div
                className="upload-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h3 className="upload-title">📷 HIS FUNNY PHOTOS</h3>
                <div className="photo-slots-grid">
                    {photoSlots.map((slot, index) => (
                        <motion.div
                            key={index}
                            className={`photo-slot ${slot.isRiya ? 'riya-slot' : ''}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                        >
                            {slot.image ? (
                                <div className="slot-image-container">
                                    <img src={slot.image} alt={slot.caption} className="slot-image" />
                                    <span className="slot-caption">{slot.caption}</span>
                                </div>
                            ) : (
                                <div className="slot-placeholder">
                                    <span className="slot-emoji">{slot.emoji}</span>
                                    <span className="slot-text">{slot.caption}</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* GIF Meme Grid */}
            <motion.h3
                className="gif-section-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                🎬 REACTION GIFS THAT DESCRIBE HIM
            </motion.h3>

            <div className="meme-grid">
                {memeGifs.map((meme, index) => (
                    <motion.div
                        key={index}
                        className="meme-card"
                        initial={{ opacity: 0, scale: 0.5, rotate: Math.random() * 10 - 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 150 }}
                        whileHover={{
                            scale: 1.1,
                            rotate: Math.random() > 0.5 ? 3 : -3,
                            zIndex: 10,
                        }}
                    >
                        <img src={meme.url} alt={meme.caption} className="meme-gif" loading="lazy" />
                        <div className="meme-caption">{meme.caption}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
