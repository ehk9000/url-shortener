import mongoose from 'mongoose';
import shortid from 'shortid';

const urlSchema = new mongoose.Schema(
	{
		longUrl: String,
		shortUrl: String,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Urls');
