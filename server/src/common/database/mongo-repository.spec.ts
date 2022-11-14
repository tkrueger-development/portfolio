import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Event, AppEvents } from '../services/event';

import { MongoRepository } from './mongo-repository';
import { MongoDB } from './mongodb';

describe('MongoRepository', () => {
  const dbName           = 'testDatabase';
  const collectionName   = 'testProducts';

  let mongoURI:          string;
  let memoryServer:      MongoMemoryServer;
  let eventEmitter:      Event<AppEvents>;

  beforeAll(async () => {
    memoryServer = await MongoMemoryServer.create();
    mongoURI     = memoryServer.getUri();
  });

  beforeEach(() => {
    eventEmitter = new Event<AppEvents>();
  });

  afterAll(async () => {
    await memoryServer.stop();
  });

  describe('MongoRepository<T>({ @collection })', () => {
    it('member functions return null when repository has no connection to mongodb', async () => {
      const mongoRepository = new MongoRepository({ eventEmitter, collectionName });

      const pipeline          = [{ $match: { test: 'test' } }];

      const wrapFn = () => {  
        mongoRepository.aggregate({ pipeline });
      };

      expect(wrapFn).toThrow(/not connected/);
    });

    it('member functions do not return null when repository is connected to mongodb', async () => {
      const mongodb = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter });

      const mongoRepository = new MongoRepository({ eventEmitter, collectionName });
      
      const pipeline          = [{ $match: { test: 'test' } }];
      const aggregationCursor = mongoRepository.aggregate({ pipeline });
      const aggregationArray  = await aggregationCursor?.toArray(); 

      expect(Array.isArray(aggregationArray)).toBeTruthy();

      await mongodb.disconnect();
    });
  });
});