import React from 'react';

const ShortCard = ({ shortUrl }) => {
	return (
		<>
			<article className='short-url-card-wrapper'>
				<a href={shortUrl}>{shortUrl}</a>
			</article>
		</>
	);
};

export default ShortCard;
