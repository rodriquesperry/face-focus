import { useState } from 'react';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import ParticleBackground from './components/particleBackground/ParticleBackground';
import './App.css';

function App() {
	const [input, setInput] = useState('');
	const [imgUrl, setImgUrl] = useState('');

	const PAT = '6fda39e24f284f92b213fac3254faff9';
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

	const onInputChange = (e) => {
		setInput(e.target.value);
		console.log(e.target.value);
	};

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
			<Navigation />
			<Logo />
			<main>
				<Rank />
				<ImageLinkForm
					onInputChange={onInputChange}
					onButtonSubmit={onButtonSubmit}
				/>
				<FaceRecognition imageUrl={imgUrl}/>
			</main>
		</div>
	);
}

export default App;
