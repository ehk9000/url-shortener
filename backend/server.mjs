import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/longUrl', async (req, res) => {
	try {
		if (req?.body?.longUrl) {
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
