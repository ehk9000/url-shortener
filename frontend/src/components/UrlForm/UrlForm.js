import React, { useEffect, useState } from 'react';
import './UrlForm.css';
import ShortUrlCard from '../ShortUrlCard/ShortUrlCard';

const UrlForm = () => {
	const [fullUrl, setFullUrl] = useState('');
	const [shortUrl, setShortUrl] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (!fullUrl) {
			setError('');
		}
	}, [fullUrl]);

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
			} else {
				setError(await response.json());
			}
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
						{error ? <p className='error'>{error}</p> : null}
					</section>
				</section>
				{shortUrl ? (
					<ShortUrlCard shortUrl={shortUrl} fullUrl={fullUrl} />
				) : null}
			</main>
		</>
	);
};

export default UrlForm;
