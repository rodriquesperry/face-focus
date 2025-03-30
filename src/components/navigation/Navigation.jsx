import PropTypes from 'prop-types';

const Navigation = ({ onSignOut }) => {
	return (
		<nav  style={{ display: 'flex', justifyContent: 'flex-end' }}>
			<p
        id='nav-container'
				onClick={onSignOut}
				className='f3 link dim black underline pa3 pointer z-10'
			>
				Sign Out
			</p>
		</nav>
	);
};

Navigation.propTypes = {
	onSignOut: PropTypes.func.isRequired,
};

export default Navigation;
