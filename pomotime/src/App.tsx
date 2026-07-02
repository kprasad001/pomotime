// App.tsx
import './App.css'
import { Grass, IconsBar, TaskList, Timer, TimeSelect } from './components'
import NightSky from './components/NightSky/NightSky';
import Platform from './components/Platform/Platform'
import alarmBird from './assets/alarmbird.mp3';
import { useRef, useState } from 'react';
import { useTimer } from './hooks';

function App() {
	const [selectedMinutes, setSelectedMinutes] = useState(25);
	const [timerSelectShow, setTimerSelectShow] = useState(false)
	const [hasChosenTime, setHasChosenTime] = useState(false)
	const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

	if (alarmAudioRef.current === null) {
		alarmAudioRef.current = new Audio(alarmBird);
	}

	const { secondsLeft, isRunning, isPaused, start, pause, reset } = useTimer({
		durationSeconds: selectedMinutes * 60,
		onComplete: () => {
			if (alarmAudioRef.current) {
				alarmAudioRef.current.currentTime = 0;
				void alarmAudioRef.current.play().catch(() => {
					console.log('Alarm sound could not play automatically.');
				});
			}
		console.log('Pomodoro finished!');
		},
	});

	const handleTimeSelect = (minutes: number) => {
		setSelectedMinutes(minutes);
		setHasChosenTime(true);
		setTimerSelectShow(false);
		start(minutes * 60);
	};

	const handleOpenSelection = () => {
		setTimerSelectShow(true);
		reset(selectedMinutes * 60);
	};

	const handleStartClick = () => {
		if (!hasChosenTime) {
			setTimerSelectShow(true);
			return;
		}

		start();
	};

	const handleCloseSelection = () => {
		setTimerSelectShow(false);
		reset(selectedMinutes * 60);
	};

	return (
		<>
			<NightSky/>
			<section id='App'>
				{timerSelectShow && (
					<div
						className="TimeSelectBackdrop"
						aria-hidden="true"
						onClick={handleCloseSelection}
					/>
				)}
				{timerSelectShow && (
					<TimeSelect onSelect={handleTimeSelect} selectedMinutes={selectedMinutes}/>
				)}
				<TaskList/>
				<NightSky/>
				<Platform />
				<Grass/>
				<IconsBar/>
				<Timer
					secondsLeft={secondsLeft}
					isRunning={isRunning}
					isPaused={isPaused}
					start={start}
					onStartClick={handleStartClick}
					pause={pause}
					startDisabled={timerSelectShow}
					showCancelButton={hasChosenTime && !timerSelectShow}
					onCancelSelection={handleOpenSelection}
				/>
			</section>
		</>
	)
}

export default App