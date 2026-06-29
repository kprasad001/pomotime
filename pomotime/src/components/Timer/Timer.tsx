// Timer.tsx
import './Timer.css'
import { grass2 } from './../../assets/' 

interface TimerProps {
	secondsLeft: number;
	isRunning: boolean;
	start: () => void;
	pause: () => void;
	reset: () => void;
}

const Timer = ({ secondsLeft, isRunning, start, pause, reset }: TimerProps) => {
	const minutes = Math.floor(secondsLeft / 60);
	const seconds = secondsLeft % 60;

	return (
		<section style={{
				width: '100%',
				height: '100%',
				backgroundImage: `url(${grass2})`,
			}} className='grass'>
			<section className="Timer">
				<div className="display">
					{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
				</div>
				<div className="controls">
					{!isRunning ? (
						<button onClick={start}>Start</button>
					) : (
						<button onClick={pause}>Pause</button>
					)}
					<button onClick={() => reset()}>Reset</button>
				</div>
			</section>
		</section>
	);
};

export default Timer;