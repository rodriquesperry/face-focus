import PropTypes from 'prop-types';
import './signin.css';

const Signin = ({ onSignIn, onSignUp }) => {
	return (
		<article className='br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center signin-form-container'>
			<main className='pa4 black-80'>
				<form className='measure'>
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
							/>
						</div>
					</fieldset>
					<div className='lh-copy mt3'>
						<input
							onClick={onSignIn}
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
				</form>
			</main>
		</article>
	);
};

Signin.propTypes = {
	isLoggedin: PropTypes.func.isRequired,
	onSignIn: PropTypes.func.isRequired,
	onSignUp: PropTypes.func.isRequired,
};

export default Signin;
