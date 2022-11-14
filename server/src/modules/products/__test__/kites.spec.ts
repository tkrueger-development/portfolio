import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { MongoDB } from '../../../common/database/mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mockProduct } from './mocks/mock-product';
import { MongoSeeder } from '../../../util/test-util/mongo-seeder';

import { app } from '../../../app';
import { Product } from '../products.model';
import { appEvent } from '../../../common/services/event';

const generateMockProducts = (
  { mockProductCount }: 
  { mockProductCount: number }): Array<Omit<Product, 'id'>> => {
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockProducts = new Array(mockProductCount).fill(0).map((_) => mockProduct({
      overrides: {
        category: 'kite',
        imagePath: 'images/products/'
      }
    }));

   return mockProducts;
};

describe('GET /api/products/kites/:count', () => {
  const dbName         = 'windandwave';
  const collectionName = 'products';

  let mongodb:      MongoDB;
  let memoryServer: MongoMemoryServer;
  let mongoSeeder:  MongoSeeder;

  const filter = {};

  beforeAll(async () => {
    memoryServer   = await MongoMemoryServer.create();
    const mongoURI = memoryServer.getUri();

    mongodb     = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter: appEvent });
    mongoSeeder = await MongoSeeder.create({ mongoURI, dbName });

    const mockProductList = generateMockProducts({ mockProductCount: 25 });

    await mongoSeeder.seed({ collectionName, inputData: mockProductList }); 
  });

  afterAll(async () => {
    await mongoSeeder.disconnect();
    await mongodb.disconnect();
    await memoryServer.stop();
  });

  describe('/api/products/kites/5', () => {
    let body:     unknown;
    let response: request.Response;

    beforeAll(async () => {
      response = await request(app).post('/api/products/kites/5').send(filter);
      body = response.body;
    });

    it('responds with status code 200', async () => {
      expect(response.statusCode).equals(200);
    });

    it('Content-Type is application/json', () => {
      expect(response.headers['content-type']).equals('application/json; charset=utf-8');
    });

    it('response is an array', () => {
      expect(Array.isArray(body)).toBeTruthy();
    });

    it('array has 5 elements', () => {
      expect((body as Array<unknown>).length).equals(5);
    });

    it('is an array of ProductOverviewDTOs', () => {
      const pathRegex  = /^images\/products\/$/;
      const imageRegex = /^(\w|-){1,}\.(png|jpg|jpeg)$/;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (body as Array<any>).forEach((product: any) => {
        expect(typeof product.id)                                   .equals('string');

        expect(product.category)                                    .equals('kite');
        expect(typeof product.brand)                                .equals('string');
        expect(typeof product.name)                                 .equals('string');

        expect(typeof product.imagePath)                            .equals('string');
        expect(pathRegex.test(product.imagePath))                   .toBeTruthy();
        expect(typeof product.ratingAverage)                        .equals('number');

        expect(typeof product.variants[0].price)                    .equals('number');
        expect(typeof product.variants[0].quantity)                 .equals('number');
        expect(imageRegex.test(product.variants[0].image))          .toBeTruthy();

        const variantSize  = product.variants[0].size;
        const variantColor = product.variants[0].color;

        if (variantSize)  expect(typeof variantSize)                .equals('string');
        if (variantColor) expect(typeof variantColor)               .equals('string');
      });
    });

    it('products array is sorted descending by ratingAverage', () => {
      const expected = [...(body as Array<Product>)];
      expected.sort((a, b) => b.ratingAverage - a.ratingAverage);

      expect(body).deep.equals(expected);
    });
  });

  describe('GET /api/products/kites/0', () => {
    it('clamps product @count to minimum of 1', async () => {
      const { body } = await request(app).post('/api/products/kites/0');

      expect(body.length).equals(1);
    });
  });

  describe('GET /api/products/kites/11', () => {
    it('clamps product @count to a maximum of 20', async () => {
      const { body } = await request(app).post('/api/products/kites/21');

      expect(body.length).equals(20);
    });
  });

  describe('GET /api/products/kites/xyz', () => {
    it('responds with 400 when @count is not a parsable number', async () => {
      await request(app).post('/api/products/kites/xyz').expect(400);
    });
  });

  describe('GET /api/products/kites/', () => {
    it('responds with 404 when @count is undefined', async () => {
      await request(app).post('/api/products/kites/').expect(404);
    });
  });
});