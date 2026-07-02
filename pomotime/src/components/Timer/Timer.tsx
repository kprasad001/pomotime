// Timer.tsx
import './Timer.css'

interface TimerProps {
	secondsLeft: number;
	isRunning: boolean;
	isPaused: boolean;
	start: () => void;
	onStartClick: () => void;
	pause: () => void;
	startDisabled: boolean;
	showCancelButton: boolean;
	onCancelSelection: () => void;
}

const Timer = ({ secondsLeft, isRunning, isPaused, onStartClick, pause, startDisabled, showCancelButton, onCancelSelection }: TimerProps) => {
	const minutes = Math.floor(secondsLeft / 60);
	const seconds = secondsLeft % 60;

	return (	
		<section className="Timer">
			<div className="display">
				{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
			</div>
			<div className="controls">
				{!isRunning ? (
					<>
						<button onClick={onStartClick} disabled={startDisabled}>{isPaused ? 'Resume' : 'Start'}</button>
						{showCancelButton && (
							<button onClick={onCancelSelection} aria-label="Choose a different timer">
								×
							</button>
						)}
					</>
				) : (
					<button onClick={pause}>Pause</button>
				)}
				
			</div>
		</section>
	);
};

export default Timer;