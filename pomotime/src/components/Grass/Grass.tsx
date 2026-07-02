// Grass.tsx
import './Grass.css'
import { grass2 } from './../../assets/' 

const Timer = () => {
	
	return (
		<section style={{
				width: '100%',
				height: '100%',
				backgroundImage: `url(${grass2})`,
			}} className='grass'>
		</section>
	);
};

export default Timer;