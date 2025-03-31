import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import ParticleBackground from './components/particleBackground/ParticleBackground';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/home';
import Signin from './components/signin/Signin';
import Register from './components/Register/Register';

import './App.css';

function App() {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const navigate = useNavigate();

	const onSignIn = () => {
		setisLoggedIn(true);
		navigate('/home');
	};

	const onSignOut = () => {
		setisLoggedIn(false);
		navigate('/');
	};

	const onSignUp = () => {
		navigate('/register');
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
				<Route path='/register' element={<Register onSignIn={onSignIn} />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
