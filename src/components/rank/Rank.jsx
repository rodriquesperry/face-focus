import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Rank = ({ name, entries }) => {
	let [rank, setRank] = useState(0);

  useEffect(() => {
    if (entries > 0) {
      setRank((prev) => prev + 1);
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
