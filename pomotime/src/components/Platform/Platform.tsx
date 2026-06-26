// Platform.tsx
import { Sprite } from '..'; // your other two animals
import { yukiSprite, dipySprite, dougySprite, grass1, barkSfx } from './../../assets/';

import './Platform.css';



const TRACK_WIDTH = 450;

const Platform = () => {
    return (
        <section className="Platform">
            <div style={{
				backgroundImage: `url(${grass1})`,
				imageRendering: 'pixelated',
			}} className="ground" />
            <div style={{ position: 'relative', width: TRACK_WIDTH,  height: 32 }}>
                <Sprite sprite={yukiSprite} scale={2.5} isRunning={true} trackWidth={TRACK_WIDTH} barkSound={barkSfx} barkText='🥎'/>
                <Sprite sprite={dipySprite} scale={2} isRunning={true} trackWidth={TRACK_WIDTH} barkSound={barkSfx} barkText='😴'/>
                <Sprite sprite={dougySprite} scale={2} isRunning={true} trackWidth={TRACK_WIDTH} barkSound={barkSfx} barkText='🥱'/>
            </div>
        </section>
    );
};

export default Platform;