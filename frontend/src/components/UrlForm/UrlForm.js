import React, { useEffect, useState } from 'react';
import './UrlForm.css';

const UrlForm = () => {
	const [url, setUrl] = useState('');
	const handleSubmit = () => {};
	return (
		<>
			<main>
				<section className='form-wrapper'>
					<form onSubmit={handleSubmit()}>
						<h2>Paste a Url You Would Like To Shorten</h2>
						<section className='url-wrapper'>
							<input
								placeholder='Shorten Your Link'
								type='text'
								size='url'
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
							<button type='submit' className='submit-btn'>
								Shorten Url
							</button>
						</section>
					</form>
				</section>
			</main>
		</>
	);
};

export default UrlForm;
