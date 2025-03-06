import PropTypes from 'prop-types';
import './imageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className='f3 center'>
				{'This magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center'>
				<div className='pa4 br3 shadow-5 form center input_container'>
					<input className='f4 pa2 w-70' type='text' onChange={onInputChange} />
					<button
						className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onButtonSubmit}
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

ImageLinkForm.propTypes = {
	onInputChange: PropTypes.func.isRequired,
	onButtonSubmit: PropTypes.func.isRequired,
};

export default ImageLinkForm;
