import './imageLinkForm.css';

const ImageLinkForm = () => {
	return (
		<div>
			<p className='f3 center'>
				{'This magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center'>
				<div className='pa4 br3 shadow-5 form center'>
					<input className='f4 pa2 w-70 center' type='text' />
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
