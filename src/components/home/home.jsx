import { useState } from 'react';

import Logo from '../logo/Logo';
import Rank from '../rank/Rank';
import ImageLinkForm from '../imageLinkForm/ImageLinkForm';
import FaceRecognition from '../faceRecognition/FaceRecognition';

const Home = () => {
  const PAT = 'c54460b16f71448d9bd4526ba359d620';
	const USER_ID = 'rock-digital-001';
	const APP_ID = 'face-focus';
	const MODEL_ID = 'face-detection';
	const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
	const [input, setInput] = useState('');
	const [imgUrl, setImgUrl] = useState('');


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

  const onInputChange = (e) => {
		setInput(e.target.value);
		console.log(e.target.value);
	};

	return (
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
	);
};

export default Home;
