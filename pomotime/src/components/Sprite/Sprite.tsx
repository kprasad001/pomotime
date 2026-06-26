// WalkingCharacter.tsx
import { useSpriteWalker } from '../../hooks';

const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 32;
const FRAME_COUNT = 3;

interface Props {
	sprite: string;
	scale: number;
	isRunning: boolean;
	trackWidth: number;
}

export default function Sprite({ sprite, scale, isRunning, trackWidth }: Props) {
	const { frame, x, facingLeft } = useSpriteWalker({
		frameCount: FRAME_COUNT,
		frameWidth: FRAME_WIDTH,
		frameInterval: 150,
		walkSpeed: 2,
		trackWidth,
		isRunning,
	});

	const displayWidth = FRAME_WIDTH * scale;
	const displayHeight = FRAME_HEIGHT * scale;
	const sheetWidth = FRAME_WIDTH * FRAME_COUNT * scale;


	return (
		<div
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
			}}
		/>
	);
}