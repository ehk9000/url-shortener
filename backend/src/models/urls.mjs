import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
	{
		longUrl: String,
		shortUrl: String,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Urls', urlSchema);
