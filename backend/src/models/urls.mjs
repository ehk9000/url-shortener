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

export const Urls = mongoose.model('Urls', urlSchema);
