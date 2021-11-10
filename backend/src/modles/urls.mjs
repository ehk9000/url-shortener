import mongoose from 'mongoose';
import shortid from 'shortid';

export const urlSchema = new mongoose.Schema(
	{
		longUrl: String,
		shortUrl: String,
	},
	{
		timestamps: true,
	}
);
