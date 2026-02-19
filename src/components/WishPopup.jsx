import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WishPopup.css';

// Global queue to manage popups
let wishQueue = [];
let isPlaying = false;

const processQueue = () => {
    if (wishQueue.length === 0 || isPlaying) return;
    
    isPlaying = true;
    const nextWish = wishQueue.shift();
    nextWish();
};

export const queueWish = (showFn) => {
    wishQueue.push(showFn);
    processQueue();
};

export const finishWish = () => {
    isPlaying = false;
    processQueue();
};

export default function WishPopup({ 
    name, 
    image, 
    voiceNote, 
    side = 'left', // 'left' or 'right'
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const audioRef = useRef(null);

    const showPopup = () => {
        setIsVisible(true);
        
        // Play voice note
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
    };

    const hidePopup = () => {
        setIsVisible(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        finishWish();
    };

    // Handle audio end
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => {
                hidePopup();
            };
            audio.addEventListener('ended', handleEnded);
            return () => audio.removeEventListener('ended', handleEnded);
        }
    }, []);

    // Expose trigger function that queues the popup
    useEffect(() => {
        window[`triggerWish_${name}`] = () => {
            if (hasTriggered) return;
            setHasTriggered(true);
            queueWish(showPopup);
        };
        return () => {
            delete window[`triggerWish_${name}`];
        };
    }, [name, hasTriggered]);

    const slideVariants = {
        hidden: {
            x: side === 'left' ? -400 : 400,
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            }
        },
        exit: {
            x: side === 'left' ? -400 : 400,
            opacity: 0,
            transition: {
                duration: 0.5,
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} src={voiceNote} preload="auto" />
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={`wish-popup wish-popup-${side}`}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="wish-popup-content">
                            <motion.img 
                                src={image} 
                                alt={name}
                                className="wish-popup-image"
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 2, -2, 0]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    repeatType: 'loop'
                                }}
                            />
                            <div className="wish-popup-info">
                                <span className="wish-popup-name">{name}</span>
                                <div className="wish-popup-playing">
                                    <span className="playing-icon">🎵</span>
                                    <span className="playing-text">Playing voice message...</span>
                                    <div className="audio-waves">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                className="wish-popup-close"
                                onClick={hidePopup}
                            >
                                ✕
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
