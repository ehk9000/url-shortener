import app from '../app.mjs';
import request from 'supertest';
import 'babel-polyfill';
import regeneratorRuntime from 'regenerator-runtime';
import { Urls } from '../models/urls.mjs';

describe('Server', () => {
	afterEach(async () => {
		await Urls.deleteMany();
	});
	describe('/createUrl', () => {
		it('Should validate urls', async () => {
			const goodUrl = {
				fullUrl:
					'https://www.amazon.com/gp/product/B078BF27BF/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1',
			};
			const response = await request(app).post('/createUrl').send(goodUrl);
			expect(response.statusCode).toBe(201);
		});
		it('Should reject bad urls', async () => {
			const badUrl = {
				fullUrl: 'asdoijhknfds',
			};
			const response = await request(app).post('/createUrl').send(badUrl);
			expect(response.statusCode).toBe(401);
			expect(response.body).toEqual('Please Provide Valid URL');
		});
		it('Should create a new url document', async () => {
			const fullUrlRequest = {
				fullUrl:
					'https://www.amazon.com/gp/product/B078BF27BF/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1',
			};
			const documents = await Urls.find().lean();

			const response = await request(app)
				.post('/createUrl')
				.send(fullUrlRequest);
			expect(response.statusCode).toBe(201);
			expect(response.body.shortUrl).toBeTruthy();
			expect(response.body.fullUrl).toBe(fullUrlRequest.fullUrl);
			expect(documents.length).toEqual(0);
		});
	});
	describe('/:shortUrl', () => {});
});
