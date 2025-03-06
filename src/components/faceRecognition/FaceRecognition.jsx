import PropTypes from 'prop-types';
import './faceRecognition.css';

const FaceRecognition = ({ imageUrl }) => {
	return (
		<>
			{imageUrl && (
				<div className='faceRecognitionContainer'>
					<img src={imageUrl} alt='Picture' />
				</div>
			)}
		</>
	);
};

export default FaceRecognition;

FaceRecognition.propTypes = {
	imageUrl: PropTypes.string.isRequired,
};
