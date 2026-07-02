// Timer.tsx
import TimeOption from '../TimeOption/TimeOption';
import './TimeSelect.css'

interface TimeSelectProps {
	selectedMinutes: number;
	onSelect: (minutes: number) => void;
}

const TimeSelect = ({ selectedMinutes, onSelect }: TimeSelectProps) => {


	return (	
		<section className="TimeSelect">
            <legend className="ow-quest-check__legend">Choose a time</legend>
            <section className='options'>
                <TimeOption name='25 mins' time={25} isSelected={selectedMinutes === 25} onClick={onSelect}/>
                <TimeOption name='50 mins' time={50} isSelected={selectedMinutes === 50} onClick={onSelect}/>
                <TimeOption name='100 mins' time={100} isSelected={selectedMinutes === 100} onClick={onSelect}/>
            </section>
		</section>
	);
};

export default TimeSelect;