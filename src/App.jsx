import { useEffect, useState } from 'react';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import ParticleBackground from './components/particleBackground/ParticleBackground';
import Signin from './components/signin/Signin';
import Register from './components/Register/Register';
import './App.css';

function App() {
	const [isLoggedin, setIsLoggedin] = useState(false);
	const [isRegistered, setIsRegistered] = useState(true);
	const [input, setInput] = useState('');
	const [imgUrl, setImgUrl] = useState('');

	const PAT = 'c54460b16f71448d9bd4526ba359d620';
	const USER_ID = 'rock-digital-001';
	const APP_ID = 'face-focus';
	const MODEL_ID = 'face-detection';
	const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

	const raw = JSON.stringify({
		user_app_id: {
			user_id: USER_ID,
			app_id: APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						url: imgUrl,
						// "base64": IMAGE_BYTES_STRING
					},
				},
			},
		],
	});

	const requestOptions = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: 'Key ' + PAT,
		},
		body: raw,
	};

	const calculteFaceLocation = () => {
		// const clarifaiFace = data;
		const image = document.getElementById('inputimage');

		const width = Number(image.width);
		const height = Number(image.height);
		console.log('width: ', width);
		console.log('height: ', height);
	};

	const onInputChange = (e) => {
		setInput(e.target.value);
		console.log(e.target.value);
	};

	const onSignin = () => {
		setIsLoggedin(true);
		console.log('onSignin');
	};

	const onSignOut = () => {
		setIsLoggedin(false);
	};

  const onSignUp = () => {
    setIsRegistered(false);
    console.log('onSignUp');
  };

  useEffect(() => {}, [isRegistered])

	const onButtonSubmit = () => {
		console.log(input);
		fetch(
			'https://api.clarifai.com/v2/models/' +
				MODEL_ID +
				'/versions/' +
				MODEL_VERSION_ID +
				'/outputs',
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const regions = result.outputs[0].data.regions;

				regions.forEach((region) => {
					// Accessing and rounding the bounding box values
					const boundingBox = region.region_info.bounding_box;
					calculteFaceLocation(boundingBox);

					const topRow = boundingBox.top_row.toFixed(3);
					const leftCol = boundingBox.left_col.toFixed(3);
					const bottomRow = boundingBox.bottom_row.toFixed(3);
					const rightCol = boundingBox.right_col.toFixed(3);

					region.data.concepts.forEach((concept) => {
						// Accessing and rounding the concept value
						const name = concept.name;
						const value = concept.value.toFixed(4);

						console.log(
							`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
						);
					});
				});
			})
			.catch((error) => console.log('error', error));
		setImgUrl(input);
	};

	return (
		<div className='app-container'>
			<ParticleBackground />
			<Navigation onSignOut={onSignOut} />
			{!isLoggedin && isRegistered ? (
				<Signin onSignin={onSignin} onSignUp={onSignUp} />
			) : !isLoggedin && !isRegistered ? (
				<Register />
			) : (
				<>
					<Logo />
					<main>
						<Rank />
						<ImageLinkForm
							onInputChange={onInputChange}
							onButtonSubmit={onButtonSubmit}
						/>
						<FaceRecognition imageUrl={imgUrl} />
					</main>
				</>
			)}
		</div>
	);
}

export default App;
