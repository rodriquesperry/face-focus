import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Rank = ({ name, entries }) => {
	let [rank, setRank] = useState(0);

  useEffect(() => {
    if (entries > 0 && entries <= 3) {
      setRank(1);
    } else if (entries > 3 && entries <= 6) {
      setRank(2);
    } else if (entries > 6 && entries <= 10) {
      setRank(3);
    } else if (entries > 10 && entries <= 15) {
      setRank(4);
    } else if (entries > 15) {
      setRank(5);
    }
  }, [entries])

	return (
		<div className=''>
			<div className='white f3 tc'>{`${name}, your current rank is...`}</div>
			<div className='white f1 tc'>{`#${rank}`}</div>
		</div>
	);
};

export default Rank;

Rank.propTypes = {
	name: PropTypes.string,
	entries: PropTypes.number,
};
