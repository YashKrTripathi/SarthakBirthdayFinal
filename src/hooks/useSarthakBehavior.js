import { useState, useEffect, useRef, useCallback } from 'react';

const IDLE_THRESHOLD = 10000; // 8-12s range, using 10s center
const SPEECH_CHANCE = 0.08; // 8% chance on click
const RANDOM_APPEAR_CHANCE = 0.003; // very low per tick

const SARTHAK_LINES = [
    "...interesting.",
    "You really did that. Okay.",
    "I saw that. We all saw that.",
    "Statistically, this was predictable.",
    "I'm not judging. I'm observing.",
    "Cool. Anyway.",
    "That's... a choice.",
    "Noted.",
    "Hmm.",
    "You done?",
];

const STICKER_REACTIONS = [
    '🙄', '😐', '😑', '🤨', '👀', '💀', '🫠', '😶',
];

// Sections that trigger appearance
const TRIGGER_SECTIONS = [
    '.roast-section',
    '.meme-wall-section',
    '.final-section',
    '.award-section',
];

export default function useSarthakBehavior() {
    const [isVisible, setIsVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const [position, setPosition] = useState({ x: 40, y: 70 }); // % based
    const [animState, setAnimState] = useState('idle'); // idle | entering | breathing | tilt | smirk | eyeroll | bounce | exiting
    const [speechBubble, setSpeechBubble] = useState(null);
    const [stickerReaction, setStickerReaction] = useState(null);
    const [glanceDirection, setGlanceDirection] = useState(null);

    const idleTimerRef = useRef(null);
    const visibilityTimerRef = useRef(null);
    const speechTimerRef = useRef(null);
    const stickerTimerRef = useRef(null);
    const randomTickRef = useRef(null);
    const hasAppearedRef = useRef(new Set());

    // Check reduced motion + mobile
    useEffect(() => {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const mobileQuery = window.matchMedia('(max-width: 767px)');

        const check = () => {
            setIsEnabled(!motionQuery.matches && !mobileQuery.matches);
        };

        check();
        motionQuery.addEventListener('change', check);
        mobileQuery.addEventListener('change', check);

        return () => {
            motionQuery.removeEventListener('change', check);
            mobileQuery.removeEventListener('change', check);
        };
    }, []);

    // Show speech bubble (rare)
    const showSpeech = useCallback(() => {
        const line = SARTHAK_LINES[Math.floor(Math.random() * SARTHAK_LINES.length)];
        setSpeechBubble(line);

        if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
        speechTimerRef.current = setTimeout(() => {
            setSpeechBubble(null);
        }, 3500);
    }, []);

    // Show sticker reaction
    const showSticker = useCallback(() => {
        const sticker = STICKER_REACTIONS[Math.floor(Math.random() * STICKER_REACTIONS.length)];
        setStickerReaction(sticker);

        if (stickerTimerRef.current) clearTimeout(stickerTimerRef.current);
        stickerTimerRef.current = setTimeout(() => {
            setStickerReaction(null);
        }, 1800);
    }, []);

    // Appear logic
    const appear = useCallback((fromSection = false) => {
        if (!isEnabled) return;

        // Pick a safe corner position (bottom-left or bottom-right)
        const side = Math.random() > 0.5 ? 'left' : 'right';
        const x = side === 'left' ? 3 : 82;
        const y = 65 + Math.random() * 15; // lower portion of viewport

        setPosition({ x, y });
        setAnimState('entering');
        setIsVisible(true);

        // Transition to breathing after enter
        setTimeout(() => setAnimState('breathing'), 800);

        // Auto-hide after 12-20 seconds
        if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);
        visibilityTimerRef.current = setTimeout(() => {
            setAnimState('exiting');
            setTimeout(() => {
                setIsVisible(false);
                setAnimState('idle');
                setSpeechBubble(null);
                setStickerReaction(null);
                setGlanceDirection(null);
            }, 600);
        }, 12000 + Math.random() * 8000);

        // Maybe show a sticker shortly after appearing
        if (Math.random() > 0.5) {
            setTimeout(() => showSticker(), 2000 + Math.random() * 2000);
        }
    }, [isEnabled, showSticker]);

    // Disappear
    const disappear = useCallback(() => {
        setAnimState('exiting');
        setTimeout(() => {
            setIsVisible(false);
            setAnimState('idle');
            setSpeechBubble(null);
            setStickerReaction(null);
        }, 600);
    }, []);

    // --- TRIGGER: Section scroll ---
    useEffect(() => {
        if (!isEnabled) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const selector = TRIGGER_SECTIONS.find(
                            (s) => entry.target.matches(s)
                        );
                        if (selector && !hasAppearedRef.current.has(selector)) {
                            hasAppearedRef.current.add(selector);
                            // Delay appearance slightly for natural feel
                            setTimeout(() => appear(true), 1500 + Math.random() * 2000);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        // Wait for DOM, then observe
        const timer = setTimeout(() => {
            TRIGGER_SECTIONS.forEach((selector) => {
                const el = document.querySelector(selector);
                if (el) observer.observe(el);
            });
        }, 2000);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [isEnabled, appear]);

    // --- TRIGGER: User idle ---
    useEffect(() => {
        if (!isEnabled) return;

        const resetIdle = () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                if (!isVisible && Math.random() > 0.4) {
                    appear();
                }
            }, IDLE_THRESHOLD + Math.random() * 4000);
        };

        const events = ['mousemove', 'scroll', 'keypress', 'touchstart'];
        events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
        resetIdle();

        return () => {
            events.forEach((e) => window.removeEventListener(e, resetIdle));
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [isEnabled, isVisible, appear]);

    // --- TRIGGER: Random low-probability ---
    useEffect(() => {
        if (!isEnabled) return;

        const tick = () => {
            if (!isVisible && Math.random() < RANDOM_APPEAR_CHANCE) {
                appear();
            }
            randomTickRef.current = setTimeout(tick, 5000);
        };

        randomTickRef.current = setTimeout(tick, 15000); // start after 15s

        return () => {
            if (randomTickRef.current) clearTimeout(randomTickRef.current);
        };
    }, [isEnabled, isVisible, appear]);

    // --- INTERACTIONS ---
    const handleHover = useCallback(() => {
        if (!isVisible) return;
        setAnimState('tilt');
        showSticker();
        setTimeout(() => setAnimState('breathing'), 800);
    }, [isVisible, showSticker]);

    const handleClick = useCallback(() => {
        if (!isVisible) return;
        setAnimState('bounce');
        setTimeout(() => setAnimState('breathing'), 500);

        // Rare speech on click
        if (Math.random() < SPEECH_CHANCE) {
            setTimeout(() => showSpeech(), 300);
        } else {
            showSticker();
        }
    }, [isVisible, showSpeech, showSticker]);

    // Occasional side-glance (toward Yash if present)
    useEffect(() => {
        if (!isVisible || !isEnabled) return;

        const glanceInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setGlanceDirection('right');
                setAnimState('eyeroll');
                setTimeout(() => {
                    setGlanceDirection(null);
                    setAnimState('breathing');
                }, 1200);
            }
        }, 6000 + Math.random() * 4000);

        return () => clearInterval(glanceInterval);
    }, [isVisible, isEnabled]);

    // Cleanup
    useEffect(() => {
        return () => {
            [visibilityTimerRef, speechTimerRef, stickerTimerRef, idleTimerRef, randomTickRef].forEach((ref) => {
                if (ref.current) clearTimeout(ref.current);
            });
        };
    }, []);

    return {
        isVisible,
        isEnabled,
        position,
        animState,
        speechBubble,
        stickerReaction,
        glanceDirection,
        handleHover,
        handleClick,
        appear,
        disappear,
    };
}
