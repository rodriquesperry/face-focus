import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './signin.css';

const Signin = ({ setIsLoggedIn, loadUser }) => {
	const url = import.meta.env.VITE_API_URL;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const onEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const onPasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const onSignIn = async (email, password) => {
		try {
			const response = await axios.post(url, {
				email,
				password,
			});
      
			const user = response.data;      

			if (user.id) {
				loadUser(response.data);
				setIsLoggedIn(true);
				navigate('/home');
			}
		} catch (error) {
			console.error('Login failed:', error.response?.data || error.message);
			alert('Login failed. Please check your credentials.');
		}
	};

	const onSignUp = () => {
		navigate('/register');
	};

	return (
		<article className='br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center signin-form-container'>
			<main className='pa4 black-80'>
				<div className='measure'>
					<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
						<legend className='f4 fw6 ph0 mh0'>Sign In</legend>
						<div className='mt3'>
							<label className='db fw6 lh-copy f6' htmlFor='email-address'>
								Email
							</label>
							<input
								className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='email'
								name='email-address'
								id='email-address'
								onChange={onEmailChange}
							/>
						</div>
						<div className='mv3'>
							<label className='db fw6 lh-copy f6' htmlFor='password'>
								Password
							</label>
							<input
								className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
								type='password'
								name='password'
								id='password'
								onChange={onPasswordChange}
							/>
						</div>
					</fieldset>
					<div className='lh-copy mt3'>
						<input
							onClick={() => onSignIn(email, password)}
							className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center'
							type='button'
							value='Sign in'
						/>
					</div>
					<div className='lh-copy mt3'>
						<p
							onClick={onSignUp}
							className='fw4 ph3 pv2 input-reset bg-transparent grow pointer f6 dib center'
							value='Sign Up'
						>
							Register
						</p>
					</div>
				</div>
			</main>
		</article>
	);
};

Signin.propTypes = {
	setIsLoggedIn: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

export default Signin;
