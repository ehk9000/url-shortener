import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import shortid from 'shortid';
import models from './src/models/urls.mjs';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/longUrl', async (req, res) => {
	try {
		const { longUrl } = req.body.longUrl;
		if (req?.body?.longUrl) {
			const newUrl = await models.Urls.create({
				longUrl,
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

app.set('port', process.env.port || 8081);
app.listen(app.get('port'), () => {
	console.log(`Server is running ⚡️ at http://localhost:${app.get('port')}`);
});

export default app;
