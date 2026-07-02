// Timer.tsx
import './TimeOption.css'

interface TimeOptionProps {
    name: string;
    time: number;
    isSelected: boolean;
    onClick: (minutes: number) => void;
}

const TimeOption = ({name, time, isSelected, onClick}: TimeOptionProps) => {

	return (	
		<button className="TimeOption" onClick={() => onClick(time)} aria-pressed={isSelected}>
			<p className='name'>{name}</p> 
            
		</button>
	);
};

export default TimeOption;