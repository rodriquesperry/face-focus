import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ onSignOut, isLoggedIn }) => {
	const navigate = useNavigate();

	const handleSignInClick = () => {
		navigate('/');
	};

	const handleSignUpClick = (e) => {
		navigate('/register');
		console.log(e);
	};

	if (isLoggedIn) {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					onClick={onSignOut}
					className='f3 link dim black underline pa3 pointer nav-link'
				>
					Sign Out
				</p>
			</nav>
		);
	} else {
		return (
			<nav
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}
			>
				<p
					onClick={handleSignInClick}
					className='f3 link dim black underline pa3 pointer nav-link'
				>
					Sign In
				</p>
				<p
					onClick={handleSignUpClick}
					className='f3 link dim black underline pa3 pointer z-10 nav-link'
				>
					Sign Up
				</p>
			</nav>
		);
	}
};

Navigation.propTypes = {
	onSignOut: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.func.isRequired,
};

export default Navigation;
