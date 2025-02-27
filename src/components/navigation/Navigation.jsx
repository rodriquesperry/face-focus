import { useState } from 'react';

const Navigation = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const onCLick = () => {
		setIsLoggedIn(false);
	};

	return (
		<nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
			<p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
		</nav>
	);
};

export default Navigation;
