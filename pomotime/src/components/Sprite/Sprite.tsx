import { useSpriteWalker } from '../../hooks';
import { useRef, useState } from 'react';
import SpeechBubble from '../SpeechBubble/SpeechBubble';

const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 32;
const FRAME_COUNT = 3;
const BUBBLE_DURATION = 1500; // ms before it disappears

interface Props {
    sprite: string;
    scale: number;
    isRunning: boolean;
    trackWidth: number;
    barkSound?: string;
    barkText?: string; // e.g. "Woof!"
}

export default function Sprite({ sprite, scale, isRunning, trackWidth, barkSound, barkText = 'Woof!' }: Props) {
    const { frame, x, facingLeft } = useSpriteWalker({
        frameCount: FRAME_COUNT,
        frameWidth: FRAME_WIDTH,
        frameInterval: 150,
        walkSpeed: 2,
        trackWidth,
        isRunning,
    });

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [showBubble, setShowBubble] = useState(false);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClick = () => {
        if (barkSound) {
            if (!audioRef.current) {
                audioRef.current = new Audio(barkSound);
                audioRef.current.volume = 0.1;
            }
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }

        setShowBubble(true);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => setShowBubble(false), BUBBLE_DURATION);
    };

    const displayWidth = FRAME_WIDTH * scale;
    const displayHeight = FRAME_HEIGHT * scale;
    const sheetWidth = FRAME_WIDTH * FRAME_COUNT * scale;

    return (
        <div
            onClick={handleClick}
            style={{
                position: 'absolute',
                left: x,
                bottom: 0,
                width: displayWidth,
                height: displayHeight,
                backgroundImage: `url(${sprite})`,
                backgroundSize: `${sheetWidth}px ${displayHeight}px`,
                backgroundPosition: `-${frame * displayWidth}px 0`,
                imageRendering: 'pixelated',
                transform: facingLeft ? 'scaleX(-1)' : 'none',
                cursor: 'pointer',
            }}
        >
            {showBubble && <SpeechBubble text={barkText} />}
        </div>
    );
}