import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function CursorEffects() {
    const lastFireTime = useRef(0);

    useEffect(() => {
        const handleClick = (e) => {
            const now = Date.now();
            if (now - lastFireTime.current < 300) return; // throttle
            lastFireTime.current = now;

            // Small confetti burst at click position
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            confetti({
                particleCount: 15,
                spread: 40,
                origin: { x, y },
                colors: ['#ff2d95', '#39ff14', '#fff01f', '#00fff7', '#bf00ff'],
                ticks: 50,
                gravity: 1.5,
                scalar: 0.8,
            });
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return null;
}
