import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { MongoDB } from '../../../common/database/mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mockProduct } from './mocks/mock-product';
import { MongoSeeder } from '../../../util/test-util/mongo-seeder';

import { app } from '../../../app';
import { Product } from '../products.model';
import { appEvent } from '../../../common/services/event';
import { randomInt } from '../../../util/test-util/random-value';


const generateMockProducts = (
  { mockProductCount }: 
  { mockProductCount: number }): Array<Omit<Product, 'id'>> => {
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockProducts = new Array(mockProductCount).fill(0).map((_) => mockProduct({
      overrides: {
        createdOn: randomInt({ min: 1, max: 1_000 }),
        imagePath: 'images/products/'
      }
    }));

   return mockProducts;
};

describe('/api/products/latest-products/@count', () => {
  const dbName           = 'windandwave';
  const collectionName   = 'products';

  let mongodb:           MongoDB;
  let memoryServer:      MongoMemoryServer;
  let mongoSeeder:       MongoSeeder;

  beforeAll(async () => {
    memoryServer     = await MongoMemoryServer.create();
    const mongoURI   = memoryServer.getUri();

    mongodb          = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter: appEvent });
    mongoSeeder      = await MongoSeeder.create({ mongoURI, dbName });

    const mockProductList = generateMockProducts({ mockProductCount: 15 });

    await mongoSeeder.seed({ collectionName, inputData: mockProductList }); 
  });

  afterAll(async () => {
    await mongoSeeder.disconnect();
    await mongodb.disconnect();
    await memoryServer.stop();
  });

  describe('GET /api/products/latest-products/5', () => {
    let body:        unknown;
    let response:    request.Response;

    beforeAll(async () => {
      response   = await request(app).get('/api/products/latest-products/5');
      body       = response.body;
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

    it('array length equals 5', () => {
      expect((body as Array<unknown>).length).equals(5);
    });

    it('is an array of products', () => {
      const pathRegex  = /^images\/products\/$/;
      const imageRegex = /^(\w|-){1,}\.(png|jpg|jpeg)$/;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (body as Array<any>).forEach((product: any) => {
        expect(typeof product.id)                                   .equals('string');
        expect(typeof product.createdOn)                            .equals('number');
        expect(typeof product.brand)                                .equals('string');
        expect(typeof product.name)                                 .equals('string');
        expect(typeof product.category)                             .equals('string');

        expect(pathRegex.test(product.imagePath))                   .toBeTruthy();
        expect(typeof product.ratingAverage)                        .equals('number');

        expect(typeof product.variants[0].price)                    .equals('number');
        expect(typeof product.variants[0].quantity)                 .equals('number');
        expect(imageRegex.test(product.variants[0].image))          .toBeTruthy();

        expect(product.variants.length === 1)                       .toBeTruthy();

        const variantSize     = product.variants[0].size;
        const variantColor    = product.variants[0].color;
        const variantPrice    = product.variants[0].price;
        const variantQuantity = product.variants[0].quantity;
        const variantImage    = product.variants[0].image;
        const variantViews    = product.variants[0].views;
        const variantSales    = product.variants[0].sales;

        expect(typeof variantImage)                                 .equals('string');
        expect(typeof variantQuantity)                              .equals('number');
        expect(typeof variantPrice)                                 .equals('number');
        expect(typeof variantViews)                                 .equals('number');
        expect(typeof variantSales)                                 .equals('number');

        if (variantSize)     expect(typeof variantSize)             .equals('string');
        if (variantColor)    expect(typeof variantColor)            .equals('string');
      });
    });

    it('products array is sorted descending by @createdOn', () => {
      const expected = [...(body as Array<Product>)];
      expected.sort((a,b) => b.createdOn - a.createdOn);

      expect(body).deep.equals(expected);
    });
  });

  describe('GET /latest-products/0', () => {
    it('clamps product @count to minimum of 1', async () => {
      const { body } = await request(app).get('/api/products/latest-products/0');

      expect(body.length).equals(1);
    });
  });

  describe('GET /latest-products/11', () => {
    it('clamps product @count to a maximum of 10', async () => {
      const { body } = await request(app).get('/api/products/latest-products/11');

      expect(body.length).equals(10);
    });
  });

  describe('GET /latest-products/xyz', () => {
    it('responds with 400 when @count is not a parsable number', async () => {
      await request(app).get('/api/products/latest-products/xyz').expect(400);
    });
  });

  describe('GET /latest-products/', () => {
    it('responds with 400 when @count is undefined', async () => {
      await request(app).get('/api/products/latest-products/').expect(400);
    });
  });

});