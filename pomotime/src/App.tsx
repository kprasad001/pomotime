// App.tsx
import './App.css'
import { TaskList, Timer } from './components'
import NightSky from './components/NightSky/NightSky';
import Platform from './components/Platform/Platform'
import { useTimer } from './hooks';

const WORK_DURATION = 25 * 60;

function App() {
	const { secondsLeft, isRunning, start, pause, reset } = useTimer({
		durationSeconds: WORK_DURATION,
		onComplete: () => {
		console.log('Pomodoro finished!');
		},
	});

	return (
		<>
			<NightSky/>
			<section id='App'>
				<TaskList/>
				<NightSky/>
				<Platform isRunning={isRunning} />
				<Timer
				secondsLeft={secondsLeft}
				isRunning={isRunning}
				start={start}
				pause={pause}
				reset={reset}
				/>
			</section>
		</>
	)
}

export default App