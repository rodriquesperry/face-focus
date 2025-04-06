import PropTypes from 'prop-types';
import './faceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
      <div className="center">
          <div className="absolute mt2">
              <img id="inputimage" src={imageUrl} alt="" width="500px" height="auto" />
              {boxes.map((box, index) => (
                  <div
                      key={index}
                      className="bounding-box"
                      style={{
                          top: box.topRow,
                          left: box.leftCol,
                          right: box.rightCol,
                          bottom: box.bottomRow
                      }}
                  ></div>
              ))}
          </div>
      </div>
  );
};

export default FaceRecognition;

FaceRecognition.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	boxes: PropTypes.func.isRequired,
};
