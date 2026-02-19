import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RandomPopups.css';

const popupMessages = [
    { text: "Sarthak is typing... 💀", emoji: "⌨️" },
    { text: "ERROR 404: Sarthak's youth not found", emoji: "🔍" },
    { text: "Windows update: Installing old age...", emoji: "💻" },
    { text: "Sarthak.exe has stopped responding", emoji: "🪟" },
    { text: "ALERT: Birthday boy detected nearby!", emoji: "🚨" },
    { text: "Achievement: Read this popup! +10 XP", emoji: "🎮" },
    { text: "Fun fact: Sarthak still can't cook 🍳", emoji: "👨‍🍳" },
    { text: "Breaking: SKY group declares today a holiday!", emoji: "📰" },
    { text: "Loading Sarthak's dance moves... failed.", emoji: "💃" },
    { text: "Warning: Excessive birthday energy detected!", emoji: "⚡" },
    { text: "Incoming message from future Sarthak: 'Still dumb'", emoji: "🔮" },
    { text: "Task failed successfully: Growing up", emoji: "✅" },
];

export default function RandomPopups() {
    const [activePopup, setActivePopup] = useState(null);

    useEffect(() => {
        const showPopup = () => {
            const randomMsg = popupMessages[Math.floor(Math.random() * popupMessages.length)];
            const randomX = Math.random() * 60 + 10; // 10-70% from left
            const randomY = Math.random() * 60 + 10; // 10-70% from top

            setActivePopup({ ...randomMsg, x: randomX, y: randomY, id: Date.now() });

            setTimeout(() => {
                setActivePopup(null);
            }, 3000);
        };

        // Show first popup after 5 seconds
        const initialTimeout = setTimeout(showPopup, 5000);

        // Then show popups every 8-15 seconds
        const interval = setInterval(() => {
            showPopup();
        }, Math.random() * 7000 + 8000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {activePopup && (
                <motion.div
                    key={activePopup.id}
                    className="random-popup"
                    style={{
                        left: `${activePopup.x}%`,
                        top: `${activePopup.y}%`,
                    }}
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 20, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => setActivePopup(null)}
                >
                    <span className="popup-emoji">{activePopup.emoji}</span>
                    <p className="popup-text">{activePopup.text}</p>
                    <span className="popup-close">✕</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
