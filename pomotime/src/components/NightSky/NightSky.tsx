// NightSky.tsx
import { night } from '../../assets';
import { useFrameCycle } from '../../hooks';

const FRAME_WIDTH = 500;   // ← set to your actual single-frame width
const FRAME_HEIGHT = 500;  // ← set to your actual single-frame height
const FRAME_COUNT = 2;

const NightSky = () => {
    const frame = useFrameCycle({ frameCount: FRAME_COUNT, frameInterval: 800 });

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                backgroundImage: `url(${night})`,
                backgroundSize: `${FRAME_WIDTH * FRAME_COUNT}px ${FRAME_HEIGHT}px`,
                backgroundPosition: `-${frame * FRAME_WIDTH}px 0`,
                imageRendering: 'pixelated',
            }}
        />
    );
};

export default NightSky;