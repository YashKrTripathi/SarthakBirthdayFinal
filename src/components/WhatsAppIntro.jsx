import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './WhatsAppIntro.css';

const chatMessages = [
    { sender: 'Yash', message: 'Abe me kya boltaa', type: 'other', delay: 1200 },
    { sender: 'Yash', message: 'Abe ghumne chalo naaaa fir movie chalenge wahi kisi pass ke theatre me', type: 'other', delay: 1800 },
    { sender: 'Krushna', message: 'I am in for ghumna not movie', type: 'other', delay: 1000 },
    { sender: 'Yash', message: 'Abe ajao na dono', type: 'other', delay: 900 },
    { sender: 'Sarthak', message: 'Me nhi ara', type: 'sarthak', delay: 2000 },
    { sender: 'Yash', message: 'Abe sirf ghumne hi chal lo bas movie rehendo', type: 'other', delay: 1200 },
    { sender: 'Krushna', message: 'Thike ghumne ke liye me ready hu', type: 'other', delay: 1100 },
    { sender: 'Sarthak', message: 'Me nhi aara kahi bhi', type: 'sarthak', delay: 2200 },
    { sender: 'Yash', message: 'Kyu be aanaa ', type: 'other', delay: 900 },
    { sender: 'Sarthak', message: 'Nahi be man nhi hai', type: 'sarthak', delay: 2000 },
    { sender: 'Krushna', message: 'Kyu nhi hai man?', type: 'other', delay: 1000 },
    { sender: 'Sarthak', message: 'Nhi hai bas meko nhi jana kahi', type: 'sarthak', delay: 2200 },
    { sender: 'Yash', message: 'Abe maska mat lagwa aaja shanti se', type: 'other', delay: 1200 },
    { sender: 'Krushna', message: 'Hana be aaja', type: 'other', delay: 900 },
    { sender: 'Sarthak', message: 'Nhi be tum log jao mera man nhi', type: 'sarthak', delay: 2200 },
    { sender: 'Yash', message: 'Kyu nhi hai man bata', type: 'other', delay: 1000 },
    { sender: 'Sarthak', message: 'Bas nhi hai man meko sona hai', type: 'sarthak', delay: 2000 },
    { sender: 'Yash', message: 'Abe par aaj to ana hi hoga', type: 'other', delay: 1100 },
    { sender: 'Krushna', message: 'Hanaaa aaj to aana hi hogaaaaaaa', type: 'other', delay: 1000 },
    { sender: 'Sarthak', message: 'Kyu?', type: 'sarthak', delay: 1600 },
    { sender: 'Yash', message: 'Areee', type: 'other', delay: 700 },
    { sender: 'Krushna', message: 'Areee', type: 'other', delay: 600 },
    { sender: 'Krushna', message: 'Chal batate hai kyu...', type: 'other', delay: 1200 },
    // The twist!
    { sender: 'Krushna', message: 'HAPPY BIRTHDAY SARTHAK! 🎂🎉🥳', type: 'other', delay: 1500, special: true },
    { sender: 'Yash', message: 'HAPPY BIRTHDAY BHAI! 🎁🎊🎈', type: 'other', delay: 800, special: true },
];

// WhatsApp notification sound using Web Audio API
const playNotificationSound = () => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create a short "pop" sound like WhatsApp
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
        console.log('Audio not supported');
    }
};

// Blast/explosion sound for birthday reveal
const playBlastSound = () => {
    console.log('Playing blast sound...');
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Resume audio context if suspended (browser autoplay policy)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // Create explosion/firework sound
        const createNoise = () => {
            const bufferSize = audioContext.sampleRate * 0.5;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
            }

            return buffer;
        };

        // Noise burst for explosion
        const noiseSource = audioContext.createBufferSource();
        noiseSource.buffer = createNoise();

        const noiseGain = audioContext.createGain();
        noiseGain.gain.setValueAtTime(0.6, audioContext.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

        const noiseFilter = audioContext.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(4000, audioContext.currentTime);
        noiseFilter.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.6);

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioContext.destination);

        // Deep boom
        const oscillator = audioContext.createOscillator();
        const oscGain = audioContext.createGain();

        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.4);

        oscGain.gain.setValueAtTime(0.7, audioContext.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.connect(oscGain);
        oscGain.connect(audioContext.destination);

        // High sparkle sound
        const sparkle = audioContext.createOscillator();
        const sparkleGain = audioContext.createGain();
        sparkle.frequency.setValueAtTime(1500, audioContext.currentTime);
        sparkle.frequency.exponentialRampToValueAtTime(3000, audioContext.currentTime + 0.1);
        sparkle.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
        sparkleGain.gain.setValueAtTime(0.2, audioContext.currentTime);
        sparkleGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        sparkle.connect(sparkleGain);
        sparkleGain.connect(audioContext.destination);

        noiseSource.start(audioContext.currentTime);
        oscillator.start(audioContext.currentTime);
        sparkle.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
        sparkle.stop(audioContext.currentTime + 0.4);

        console.log('Blast sound played!');
    } catch (e) {
        console.log('Audio error:', e);
    }
};

const senderColors = {
    Yash: '#25D366',
    Krushna: '#FF6B6B',
    Sarthak: '#9B59B6',
};

function TypingIndicator({ sender }) {
    return (
        <div className="message-wrapper received">
            <div className="message-bubble received-bubble typing-bubble">
                <span className="sender-name" style={{ color: senderColors[sender] }}>
                    {sender}
                </span>
                <div className="typing-indicator">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                </div>
            </div>
        </div>
    );
}

function SarthakTypingIndicator() {
    return (
        <div className="message-wrapper sent">
            <div className="message-bubble sent-bubble typing-bubble">
                <div className="typing-indicator">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                </div>
            </div>
        </div>
    );
}

export default function WhatsAppIntro({ onComplete }) {
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [typingUser, setTypingUser] = useState(null);
    const [showBirthdayBlast, setShowBirthdayBlast] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const chatContainerRef = useRef(null);
    const timeoutRefs = useRef([]);
    const onCompleteRef = useRef(onComplete);
    const yashVnRef = useRef(null);
    const krushnaVnRef = useRef(null);

    // Keep onComplete ref updated
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const fireConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const colors = ['#ff6600', '#fff01f', '#ff2d95', '#00ff00', '#00ffff'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    useEffect(() => {
        if (!hasStarted) return;

        let currentIndex = 0;
        let isCancelled = false;

        console.log('WhatsApp chat starting, total messages:', chatMessages.length);

        const showNextMessage = () => {
            if (isCancelled) return;

            console.log('showNextMessage called, currentIndex:', currentIndex);

            if (currentIndex >= chatMessages.length) {
                console.log('All messages done, showing blast and transitioning...');
                setTypingUser(null);
                // Show birthday blast after chat ends
                const blastTimeout = setTimeout(() => {
                    if (isCancelled) return;
                    console.log('Showing birthday blast');
                    setShowBirthdayBlast(true);
                    playBlastSound();
                    fireConfetti();
                    // Start fade out before transition
                    const fadeTimeout = setTimeout(() => {
                        if (isCancelled) return;
                        setFadeOut(true);
                        // Transition to main site after fade
                        const completeTimeout = setTimeout(() => {
                            if (isCancelled) return;
                            console.log('Calling onComplete to transition');
                            if (onCompleteRef.current) {
                                onCompleteRef.current();
                            }
                        }, 1000);
                        timeoutRefs.current.push(completeTimeout);
                    }, 2000);
                    timeoutRefs.current.push(fadeTimeout);
                }, 800);
                timeoutRefs.current.push(blastTimeout);
                return;
            }

            const currentMsg = chatMessages[currentIndex];

            // Show typing indicator
            setTypingUser(currentMsg.sender);

            // After typing delay, show the message
            const typingTimeout = setTimeout(() => {
                if (isCancelled) return;
                setTypingUser(null);
                setVisibleMessages(prev => [...prev, currentIndex]);

                // Play notification sound (not on special messages - those get blast sound)
                if (!currentMsg.special) {
                    playNotificationSound();
                }

                // Fire confetti on special messages
                if (currentMsg.special) {
                    confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.7 },
                        colors: ['#ff6600', '#fff01f', '#ff2d95']
                    });

                    // Trigger specific voice notes
                    if (currentMsg.sender === 'Yash' && yashVnRef.current) {
                        yashVnRef.current.play().catch(e => console.log('Yash voice failed:', e));
                    } else if (currentMsg.sender === 'Krushna' && krushnaVnRef.current) {
                        krushnaVnRef.current.play().catch(e => console.log('Krushna voice failed:', e));
                    }
                }

                currentIndex++;

                // Pause before next typing starts
                const gapTimeout = setTimeout(showNextMessage, 600);
                timeoutRefs.current.push(gapTimeout);
            }, currentMsg.delay);

            timeoutRefs.current.push(typingTimeout);
        };

        // Start the sequence after a brief pause
        const startTimeout = setTimeout(showNextMessage, 800);
        timeoutRefs.current.push(startTimeout);

        return () => {
            isCancelled = true;
            timeoutRefs.current.forEach(id => clearTimeout(id));
            timeoutRefs.current = [];
        };
    }, [hasStarted]);

    // Auto-scroll to bottom as messages appear
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [visibleMessages, typingUser]);

    const handleEnterChat = () => {
        setHasStarted(true);

        // Comprehensive Browser Audio Handshake
        try {
            // 1. Kickstart AudioContext
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();
                if (ctx.state === 'suspended') ctx.resume();
                window.globalAudioCtx = ctx; // Share it
            }

            // 2. Warm up all physical audio elements
            const allAudios = document.querySelectorAll('audio');
            console.log('Warming up', allAudios.length, 'audio tracks...');

            allAudios.forEach(audio => {
                // Temporary volume mute
                const originalVolume = audio.volume;
                audio.volume = 0;

                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        audio.pause();
                        audio.volume = originalVolume;
                        audio.currentTime = 0;
                    }).catch(e => {
                        console.log('Manual kick required for', audio.src);
                        // If it fails, we keep volume 0 and try again silently
                        audio.muted = true;
                        audio.play().then(() => {
                            audio.pause();
                            audio.muted = false;
                        }).catch(() => { });
                    });
                }
            });
        } catch (e) {
            console.log('Global audio handshake failed:', e);
        }
    };

    return (
        <div className={`whatsapp-intro ${showBirthdayBlast ? 'blast-active' : ''} ${fadeOut ? 'fade-out' : ''}`}>
            {!hasStarted && (
                <div className="wa-entry-overlay" onClick={handleEnterChat}>
                    <div className="wa-notification-card">
                        <div className="wa-notif-header">
                            <span className="wa-notif-icon">💬</span>
                            <span className="wa-notif-app">WHATSAPP</span>
                            <span className="wa-notif-time">now</span>
                        </div>
                        <div className="wa-notif-body">
                            <span className="wa-notif-title">S.K.Y (Krushna, Yash)</span>
                            <span className="wa-notif-text">Abe me kya boltaa... (+25 messages)</span>
                        </div>
                        <button className="wa-enter-btn">ENTER CHAT</button>
                    </div>
                    <div className="wa-entry-hint">Tap to unlock the chaos 🔓</div>
                </div>
            )}
            <div className="whatsapp-phone">
                {/* Status Bar */}
                <div className="phone-status-bar">
                    <span className="status-time">12:56</span>
                    <div className="status-icons">
                        <span>💬</span>
                        <span>M</span>
                        <span>𝕏</span>
                        <span>•</span>
                        <span>📶</span>
                        <span className="battery">79+ 🔋</span>
                    </div>
                </div>

                {/* WhatsApp Header */}
                <div className="wa-header">
                    <div className="wa-header-left">
                        <span className="wa-back">←</span>
                        <div className="wa-avatar">
                            <img src="/sky-group.jpg" alt="S.K.Y" />
                        </div>
                        <div className="wa-info">
                            <span className="wa-name">S.K.Y</span>
                            <span className="wa-status">Krushna, Yash, You</span>
                        </div>
                    </div>
                    <div className="wa-header-icons">
                        <span className="video-icon">📹</span>
                        <span className="dropdown-arrow">▼</span>
                        <span className="menu-dots">⋮</span>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="wa-chat" ref={chatContainerRef}>
                    <div className="wa-date-badge">
                        <span>Today</span>
                    </div>

                    {visibleMessages.map((msgIndex) => {
                        const chat = chatMessages[msgIndex];
                        if (!chat) return null;
                        return (
                            <div
                                key={msgIndex}
                                className={`wa-msg ${chat.type === 'sarthak' ? 'wa-msg-sent' : 'wa-msg-received'} ${chat.special ? 'wa-msg-special' : ''} wa-msg-animate`}
                            >
                                {chat.type !== 'sarthak' && (
                                    <span
                                        className="wa-sender"
                                        style={{ color: senderColors[chat.sender] }}
                                    >
                                        {chat.sender}
                                    </span>
                                )}
                                <span className="wa-text">{chat.message}</span>
                                <span className="wa-time">
                                    {chat.type === 'sarthak' ? '✓✓ ' : ''}
                                    {`${9 + Math.floor(msgIndex / 4)}:${String(41 + (msgIndex * 2) % 19).padStart(2, '0')}`}
                                </span>
                            </div>
                        );
                    })}

                    {/* Typing Indicator */}
                    {typingUser && (
                        typingUser === 'Sarthak'
                            ? <SarthakTypingIndicator />
                            : <TypingIndicator sender={typingUser} />
                    )}
                </div>

                {/* Input Bar */}
                <div className="wa-input">
                    <span>😊</span>
                    <div className="wa-input-field">Type a message</div>
                    <span>📎</span>
                    <span>📷</span>
                    <div className="wa-mic">🎤</div>
                </div>
            </div>

            {/* Skip Button for testing */}
            <button
                onClick={() => {
                    console.log('Skip clicked, calling onComplete');
                    if (onCompleteRef.current) {
                        onCompleteRef.current();
                    }
                }}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    padding: '10px 20px',
                    background: '#25D366',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    zIndex: 100
                }}
            >
                Skip Chat →
            </button>

            {/* Birthday Blast Overlay */}
            {showBirthdayBlast && (
                <div className="birthday-blast">
                    <h1 className="blast-text">🎂 HAPPY BIRTHDAY SARTHAK! 🎂</h1>
                    <p className="blast-subtext">Get ready for the chaos...</p>
                </div>
            )}

            {/* Hidden Audio Elements */}
            <audio ref={yashVnRef} src="/wishes/yash vn.ogg" preload="auto" />
            <audio ref={krushnaVnRef} src="/wishes/krushna vn.ogg" preload="auto" />
        </div>
    );
}
