import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import shortid from 'shortid';
import models from './src/models/urls.mjs';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/createUrl', async (req, res) => {
	try {
		const { fullUrl } = req?.body?.fullUrl;
		if (fullUrl) {
			const newUrl = await models.Urls.create({
				fullUrl,
				shortUrl: shortid.generate,
			});
			return res.status(201).send(newUrl);
		} else {
			res.status(401).send('Please Provide Valid URL');
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});

app.get('/:shortUrl', async (req, res) => {
	try {
		const { shortUrl } = req?.params?.shortUrl;
		if (shortUrl) {
			const fullUrl = await models.Urls.findOne({ shortUrl }).fullUrl;

			res.redirect(longUrl);
		}
		return res
			.status(404)
			.send(`Sorry, no redirect has been found for ${shortUrl}`);
	} catch (error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});

app.set('port', process.env.port || 8081);
app.listen(app.get('port'), () => {
	console.log(`Server is running ⚡️ at http://localhost:${app.get('port')}`);
});

export default app;
