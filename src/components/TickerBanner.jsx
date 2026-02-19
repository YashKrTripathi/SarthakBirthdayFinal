import { motion } from 'framer-motion';
import './TickerBanner.css';

const tickerItems = [
    '🎂 HAPPY BIRTHDAY SARTHAK 🎂',
    '💀 AGING IN PROGRESS 💀',
    '🔥 SKY GROUP APPROVED 🔥',
    '⚡ LEGEND STATUS: CONFIRMED ⚡',
    '🎮 LEVEL UP COMPLETE 🎮',
    '👑 KING OF CHAOS 👑',
    '🚀 BIRTHDAY MODE: ACTIVATED 🚀',
    '🎯 TARGET: MAXIMUM FUN 🎯',
];

export default function TickerBanner() {
    return (
        <motion.div
            className="ticker-banner"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <div className="ticker-track">
                {[...tickerItems, ...tickerItems].map((item, i) => (
                    <span key={i} className="ticker-item">
                        {item}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
