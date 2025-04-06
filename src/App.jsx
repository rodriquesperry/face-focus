import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import axios from 'axios';

import ParticleBackground from './components/particleBackground/ParticleBackground';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/home';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';

import './App.css';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const initState = {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: '',
	};
	const [user, setUser] = useState(initState);
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
	}, [isLoggedIn]);

	const loadUser = (data) => {
		setUser({
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined,
		});
	};

	const onSignOut = () => {
		setUser(initState);
		setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
		navigate('/');
	};

	console.log('App.js user after loadUser:', user);

	return (
		<div className='app-container'>
			<ParticleBackground />
			<Navigation onSignOut={onSignOut} isLoggedIn={isLoggedIn} />
			<Routes>
				<Route
					path='/'
					element={<Signin setIsLoggedIn={setIsLoggedIn} loadUser={loadUser} />}
				/>
				<Route path='/register' element={<Register loadUser={loadUser} />} />
				<Route
					path='/home'
					element={
						<Home
							name={user}
							user={user}
							setUser={setUser}
							loadUser={loadUser}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
