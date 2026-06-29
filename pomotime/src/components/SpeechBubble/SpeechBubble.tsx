// SpeechBubble.tsx
interface SpeechBubbleProps {
    text: string;
}

export default function SpeechBubble({ text }: SpeechBubbleProps) {
    return (
        <div
            style={{
                position: 'absolute',
                bottom: '100%', 
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: 6,
                padding: '6px 10px',
                background: 'white',
                border: '2px solid black',
                borderRadius: 6,
                fontSize: 12,
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-hud, "VT323", monospace)',
            }}
        >
            {text}
            {/* little tail pointing down at the sprite */}
            <div
                style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '5px solid black',
                }}
            />
        </div>
    );
}