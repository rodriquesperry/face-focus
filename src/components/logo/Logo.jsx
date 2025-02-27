import BrainLogo from '../../assets/icons8-brain-100.png';
import './logo.css';

const Logo = () => {
	return (
		<div
			className='ma4 mt0 br2 shadow-2 pa3 logo_container'
			style={{ width: '150px', height: '150px' }}
		>
    <div className="center">
			<img style={{ margin: '0 auto', width: '100%' }} src={BrainLogo} alt='Brain Logo'/>
    </div>
		</div>
	);
};

export default Logo;
