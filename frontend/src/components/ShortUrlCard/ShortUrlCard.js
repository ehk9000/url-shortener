import React from 'react';
import './ShortUrlCard.css';

const ShortUrlCard = ({ shortUrl, fullUrl }) => {
	return (
		<>
			<article className='short-url-card-wrapper'>
				<a href={shortUrl}>{shortUrl}</a>
				<p>{fullUrl}</p>
			</article>
		</>
	);
};

export default ShortUrlCard;
