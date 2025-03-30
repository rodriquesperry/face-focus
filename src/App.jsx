import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import Home from './components/home/home';
import ParticleBackground from './components/particleBackground/ParticleBackground';
import Signin from './components/signin/Signin';
import Register from './components/Register/Register';
import './App.css';

function App() {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [isRegistered, setIsRegistered] = useState(true);
	const navigate = useNavigate();

	const onSignIn = () => {
		setisLoggedIn(true);
		navigate('/home');
	};

	const onSignOut = () => {
		navigate('/');
	};

	const onSignUp = () => {
		setIsRegistered(false);
		navigate('/register');
		console.log('onSignUp');
	};

	return (
		<div className='app-container'>
			<ParticleBackground />
			<Navigation onSignOut={onSignOut} isLoggedIn={isLoggedIn} />

			<Routes>
				<Route
					path='/'
					element={<Signin onSignIn={onSignIn} onSignUp={onSignUp} />}
				/>
				<Route path='/register' element={<Register />} />
				<Route path='/home' element={<Home />} />
			</Routes>

			{/* <Routes>
				{!isLoggedIn && isRegistered && (
					<Route
						path='/'
						element={<Signin onSignIn={onSignIn} onSignUp={onSignUp} />}
					/>
				)}
				{!isLoggedIn && !isRegistered && (
					<Route path='/register' element={<Register />} />
				)}
				{console.log('isLoggedIn: ', isLoggedIn)}
				{isLoggedIn && <Route path='/home' element={<Home />} />}
			</Routes> */}
		</div>
	);
}

export default App;
