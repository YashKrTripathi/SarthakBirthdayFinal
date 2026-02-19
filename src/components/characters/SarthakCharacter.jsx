import useSarthakBehavior from '../../hooks/useSarthakBehavior';
import '../../styles/sarthak.css';

// Sarthak character component disabled - duo.png removed
export default function SarthakCharacter({ disabled = false }) {
    // Component disabled - return null
    return null;

    const positionStyle = {
        left: `${position.x}%`,
        top: `${position.y}%`,
    };

    const characterClass = [
        'sarthak-character',
        `sarthak--${animState}`,
        glanceDirection ? `sarthak--glance-${glanceDirection}` : '',
    ].filter(Boolean).join(' ');

    return (
        <div className="sarthak-container" style={positionStyle} aria-hidden="true">
            {/* Speech bubble — rare */}
            {speechBubble && (
                <div className="sarthak-speech">
                    <span>{speechBubble}</span>
                </div>
            )}

            {/* Sticker reaction — near head */}
            {stickerReaction && (
                <div className="sarthak-sticker">
                    <span>{stickerReaction}</span>
                </div>
            )}

            {/* Character image */}
            <div
                className={characterClass}
                onMouseEnter={handleHover}
                onClick={handleClick}
                role="img"
                aria-label="Sarthak observing"
            >
                <img
                    src={sarthakImg}
                    alt=""
                    draggable={false}
                    className="sarthak-img"
                />
            </div>
        </div>
    );
}
