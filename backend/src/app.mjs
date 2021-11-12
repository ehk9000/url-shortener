import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import shortid from 'shortid';
import { Urls } from './models/urls.mjs';

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://username:password@localhost:27017');

app.post('/createUrl', async (req, res) => {
	const regExCheck =
		/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

	try {
		const { fullUrl } = req?.body;
		if (fullUrl && fullUrl.match(regExCheck)) {
			const newUrl = await Urls.create({
				fullUrl,
				shortUrl: shortid.generate(),
			});
			return res.status(201).json(newUrl);
		} else {
			res.status(401).json('Please Provide Valid URL');
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json(error.message);
	}
});

app.get('/:shortUrl', async (req, res) => {
	try {
		const { shortUrl } = req?.params;
		if (shortUrl) {
			const url = await Urls.findOne({ shortUrl });

			return res.redirect(url.fullUrl);
		} else {
			return res
				.status(404)
				.json(`Sorry, no redirect has been found for ${shortUrl}`);
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json(error.message);
	}
});

export default app;
