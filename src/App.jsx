import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import axios from 'axios';

import ParticleBackground from './components/particleBackground/ParticleBackground';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/home';
import Signin from './components/signin/Signin';
import Register from './components/register/Register.jsx';

import './App.css';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(localStorage.getItem('isLoggedIn')) || false);
	const initState = {
    id: '',
		name: '',
		email: '',
		entries: 0,
		joined: '',
	};
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(() => storedUser || initState);
	const navigate = useNavigate();
  
	const loadUser = (data) => {
    setUser({
      id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined,
		});
    localStorage.setItem('user', JSON.stringify(data));
    setIsLoggedIn(true);
	};
  
	const onSignOut = () => {
    setUser(initState);
		setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
		navigate('/');
	};
	
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

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
