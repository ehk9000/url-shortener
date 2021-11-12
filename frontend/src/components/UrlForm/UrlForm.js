import React, { useState } from 'react';
import './UrlForm.css';

const UrlForm = () => {
	const [fullUrl, setFullUrl] = useState('');
	const [shortUrl, setShortUrl] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async () => {
		try {
			const response = await fetch('http://localhost:8081/createUrl', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ fullUrl }),
			});

			if (response.ok) {
				const resolvedRes = await response.json();
				setShortUrl(`http://localhost:8081/${resolvedRes.shortUrl}`);
			}
			setError(response.message);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<>
			<main>
				<section className='form-wrapper'>
					<section className='url-wrapper'>
						<h2>Paste a Url You Would Like To Shorten</h2>
						<input
							placeholder='Shorten Your Link'
							type='text'
							size='url'
							value={fullUrl}
							onChange={(e) => setFullUrl(e.target.value)}
						/>
						<button type='submit' className='submit-btn' onClick={handleSubmit}>
							Shorten Url
						</button>
						{shortUrl ? <a href={shortUrl}>{shortUrl}</a> : null}
						{error ? <p>{error}</p> : null}
					</section>
				</section>
			</main>
		</>
	);
};

export default UrlForm;
