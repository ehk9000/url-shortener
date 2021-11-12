import app from '../app.mjs';
import request from 'supertest';
import 'babel-polyfill';
import regeneratorRuntime from 'regenerator-runtime';

describe('Server', () => {
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
	});
});
