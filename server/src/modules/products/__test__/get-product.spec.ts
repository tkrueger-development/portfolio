import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import { MongoDB } from '../../../common/database/mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mockProduct } from './mocks/mock-product';
import { MongoSeeder } from '../../../util/test-util/mongo-seeder';

import { app } from '../../../app';
import { Product } from '../products.model';
import { appEvent } from '../../../common/services/event';
import { Collection, ObjectId } from 'mongodb';


describe('/api/products/:productId', () => {
  const mockedProduct    = mockProduct({ overrides: { imagePath: 'images/products/' } });
  const dbName           = 'windandwave';
  const collectionName   = 'products';

  let mongodb:           MongoDB;
  let memoryServer:      MongoMemoryServer;
  let mongoSeeder:       MongoSeeder;
  let helperCollection:  Collection;
  let id:                string;

  beforeAll(async () => {
    memoryServer     = await MongoMemoryServer.create();
    const mongoURI   = memoryServer.getUri();

    mongodb          = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter: appEvent });
    mongoSeeder      = await MongoSeeder.create({ mongoURI, dbName });

    await mongoSeeder.seed({ collectionName, inputData: [mockedProduct] });

    helperCollection = mongodb.getCollection({ collectionName });
    const product = await helperCollection.findOne<Omit<Product, 'id'> & { _id: ObjectId }>();

    if (!product) throw new Error('Integration Test/get-product.spec.ts: No Product found.');

    id = product._id.toString();
  });

  afterAll(async () => {
    await mongoSeeder.disconnect();
    await mongodb.disconnect();
    await memoryServer.stop();
  });

  describe('GET', () => {
    let body:        unknown;
    let response:    request.Response;

    beforeAll(async () => {
      response   = await request(app).get('/api/products/' + id);
      body       = response.body;
    });

    it('responds with status code 200', async () => {
      expect(response.statusCode).equals(200);
    });

    it('Content-Type is application/json', () => {
      expect(response.headers['content-type']).equals('application/json; charset=utf-8');
    });

    it('response is an object', () => {
      expect(typeof body === 'object').toBeTruthy();
    });

    it('object is a product', () => {
      const pathRegex  = /^images\/products\/$/;
      const imageRegex = /^(\w|-){1,}\.(png|jpg|jpeg)$/;

      const assumeProduct = body as Product & { id: string };

      expect(typeof assumeProduct.id)                          .equals('string');
      expect(typeof assumeProduct.createdOn)                   .equals('number');
      expect(typeof assumeProduct.modifiedOn)                  .equals('number');
      expect(typeof assumeProduct.brand)                       .equals('string');
      expect(typeof assumeProduct.name)                        .equals('string');
      expect(typeof assumeProduct.category)                    .equals('string');

      expect(typeof assumeProduct.imagePath)                   .equals('string');
      expect(pathRegex.test(assumeProduct.imagePath))          .toBeTruthy();

      expect(typeof assumeProduct.ratingAverage)               .equals('number');

      expect(typeof assumeProduct.variants[0].price)           .equals('number');
      expect(typeof assumeProduct.variants[0].quantity)        .equals('number');

      expect(typeof assumeProduct.variants[0].image)           .equals('string');
      expect(imageRegex.test(assumeProduct.variants[0].image)) .toBeTruthy();

      expect(assumeProduct.variants.length >= 1)               .toBeTruthy();

      expect(typeof assumeProduct.variants[0].price)           .equals('number');
      expect(typeof assumeProduct.variants[0].views)           .equals('number');
      expect(typeof assumeProduct.variants[0].sales)           .equals('number');

      const variantSize  = assumeProduct.variants[0].size;
      const variantColor = assumeProduct.variants[0].color;

      if (variantSize)  expect(typeof variantSize)             .equals('string');
      if (variantColor) expect(typeof variantColor)            .equals('string');

    });

    it('responds with 400 when @productId is not a valid id', async () => {
      const { statusCode } = await request(app).get('/api/products/xyz');

      expect(statusCode).equals(400);
    });

    it('responds with 404 when no @productId is given', async () => {
      await request(app).get('/api/products/').expect(404);
    });
  });
});