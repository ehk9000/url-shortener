import app from '../app.mjs';
import request from 'supertest';
import 'babel-polyfill';
import regeneratorRuntime, { async } from 'regenerator-runtime';
import { Urls } from '../models/urls.mjs';
import shortid from 'shortid';

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
			const documents = await Urls.find().lean();
			expect(response.statusCode).toBe(401);
			expect(response.body).toEqual('Please Provide Valid URL');
			expect(documents.length).toBe(0);
		});
		it('Should create a new url document', async () => {
			const fullUrlRequest = {
				fullUrl:
					'https://www.amazon.com/gp/product/B078BF27BF/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1',
			};
			const response = await request(app)
				.post('/createUrl')
				.send(fullUrlRequest);

			const documents = await Urls.find().lean();
			expect(response.statusCode).toBe(201);
			expect(response.body.shortUrl).toBeTruthy();
			expect(response.body.fullUrl).toBe(fullUrlRequest.fullUrl);
			expect(documents.length).toEqual(1);
		});
	});
	describe('/:shortUrl', () => {
		beforeEach(async () => {
			const fullUrlRequest = {
				fullUrl:
					'https://www.amazon.com/gp/product/B078BF27BF/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1',
			};
			await request(app).post('/createUrl').send(fullUrlRequest);
		});
		it('Should return 302', async () => {
			const document = await Urls.findOne({
				fullUrl:
					'https://www.amazon.com/gp/product/B078BF27BF/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1',
			});
			const shortUrl = document.shortUrl;
			const response = await request(app).get(`/${shortUrl}`);

			expect(response.statusCode).toBe(302);
		});
		it('Should return 404 if not found', async () => {
			const shortUrl = shortid.generate();

			const response = await request(app).get(`/${shortUrl}`);
			console.log(response.body);

			expect(response.statusCode).toBe(404);
			expect(response.body).toEqual(
				`Sorry, no redirect has been found for ${shortUrl}`
			);
		});
	});
});
