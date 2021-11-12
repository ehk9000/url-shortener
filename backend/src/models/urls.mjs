import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
	{
		fullUrl: String,
		shortUrl: String,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Urls', urlSchema);
