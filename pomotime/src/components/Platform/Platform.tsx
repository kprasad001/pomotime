// Platform.tsx
import { Sprite } from '..'; // your other two animals
import { yukiSprite, dipySprite, dougySprite, grass1 } from './../../assets/';

import './Platform.css';

interface PlatformProps {
    isRunning: boolean;
}

const TRACK_WIDTH = 450;

const Platform = ({ isRunning }: PlatformProps) => {
    return (
        <section className="Platform">
            <div style={{
				backgroundImage: `url(${grass1})`,
				imageRendering: 'pixelated',
			}} className="ground" />
            <div style={{ position: 'relative', width: TRACK_WIDTH, height: 32 }}>
                <Sprite sprite={yukiSprite} scale={2.5} isRunning={isRunning} trackWidth={TRACK_WIDTH} />
                <Sprite sprite={dipySprite} scale={2} isRunning={isRunning} trackWidth={TRACK_WIDTH} />
                <Sprite sprite={dougySprite} scale={2} isRunning={isRunning} trackWidth={TRACK_WIDTH} />
            </div>
        </section>
    );
};

export default Platform;