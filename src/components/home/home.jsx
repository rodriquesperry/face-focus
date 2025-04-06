import PropTypes from 'prop-types';
import { useState } from 'react';

import Logo from '../logo/Logo';
import Rank from '../rank/Rank';
import ImageLinkForm from '../imageLinkForm/ImageLinkForm';
import FaceRecognition from '../faceRecognition/FaceRecognition';
import axios from 'axios';

const Home = ({ user, loadUser }) => {
	const url = import.meta.env.VITE_API_URL;
	const [input, setInput] = useState('');
	const [imgUrl, setImgUrl] = useState(
		'https://samples.clarifai.com/metro-north.jpg'
	);
	const [boxes, setBoxes] = useState([]);
	const { name, id, entries } = user;

	const calculateFaceLocation = (regions) => {
		const image = document.getElementById('inputimage');
		if (!image) return;

		const width = image.width;
		const height = image.height;

		return regions.map((region) => {
			const boundingBox = region.region_info.bounding_box;
			return {
				leftCol: boundingBox.left_col * width,
				topRow: boundingBox.top_row * height,
				rightCol: width - boundingBox.right_col * width,
				bottomRow: height - boundingBox.bottom_row * height,
			};
		});
	};

	const onButtonSubmit = async () => {
		try {
			const response = await axios.post(`${url}/detect-face`, {
				imgUrl: input,
			});
			setImgUrl(input);

			const regions = response.data.outputs[0].data.regions;
			if (regions) {
				const newBoxes = calculateFaceLocation(regions);
				setBoxes(newBoxes);
			}

			const entriesResponse = await axios.post(`${url}/api/image`, {
				id: id,
			});

			loadUser(({
        ...user,
				entries: entriesResponse.data,
			}));

			console.log('entryResponse: ', entries);
		} catch (error) {
			console.error('Error fetching face detection: ', error);
		}
	};

	console.log('entries: ', entries);

	const onInputChange = (e) => {
		setInput(e.target.value);
		console.log(e.target.value);
	};

	return (
		<>
			<Logo />
			<main id='home-container'>
				<Rank name={name} entries={entries} />
				<ImageLinkForm
					onInputChange={onInputChange}
					onButtonSubmit={onButtonSubmit}
				/>
				<FaceRecognition imageUrl={imgUrl} boxes={boxes} />
			</main>
		</>
	);
};

export default Home;

Home.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string,
		entries: PropTypes.number,
	}),
	loadUser: PropTypes.func.isRequired,
};
