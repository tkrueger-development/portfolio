import { vi, describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { MongoDB } from './mongodb';
import { Event, AppEvents } from '../services/event';
import { Collection } from 'mongodb';

describe('MongoDB', () => {
  const dbName           = 'testDb';
  const collectionName   = 'testCollection';
  const eventEmitter     = new Event<AppEvents>();

  let mongoURI:          string;
  let memoryServer:      MongoMemoryServer;

  beforeAll(async () => {
    memoryServer   = await MongoMemoryServer.create();
    mongoURI       = memoryServer.getUri();
  });

  afterAll(async () => {
    await memoryServer.stop();
  });

  describe('!~ createConnection({ @mongoURI, @dbName, @eventEmitter })', () => {
    it('returns a MongoDB instance', async () => {
      const mongodb = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter });

      expect(mongodb instanceof MongoDB).toBeTruthy();

      await mongodb.disconnect();
    });
    
    it('instance is connected to a mongo database', async () => {
      const mongodb = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter });

      expect(mongodb instanceof MongoDB).toBeTruthy();
      expect(typeof mongodb.getCollection).equals('function');

      const collection   = mongodb.getCollection({ collectionName });
      const insertResult = await collection.insertOne({ test: 'test' });

      expect(insertResult.acknowledged).toBeTruthy();
      expect(insertResult.insertedId).toBeTruthy();

      const deleteResult = await collection.deleteMany({});

      expect(deleteResult.acknowledged).toBeTruthy();
      expect(deleteResult.deletedCount).equals(1);

      await mongodb.disconnect();
    });

    it('emits event "mongodb/connected" when connection was established', async () => {
      const mockCallback = vi.fn();

      eventEmitter.subscribe({ event: AppEvents.MONGODB_CONNECTED, callback: mockCallback });

      const mongodb = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter });
      await mongodb.disconnect();

      expect(mockCallback).toHaveBeenCalledOnce();
    });
  });

  describe('getCollection({ @collectionName })', () => {
    it('returns a collection', async () => {
      const mongodb = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter });

      const collection = mongodb.getCollection({ collectionName });

      expect(collection instanceof Collection).toBeTruthy();
      await mongodb.disconnect();
    });

    it('returned collection is @collectionName', async () => {
      const mongodb = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter });

      const collection = mongodb.getCollection({ collectionName });

      expect(collection.namespace.split('.')[1]).equals(collectionName);
      await mongodb.disconnect();
    });
  });

  describe('~ disconnect()', () => {
    it('emits event "mongodb/disconnected" when connection was closed', async () => {
      const mockCallback = vi.fn();

      eventEmitter.subscribe({ event: AppEvents.MONGODB_DISCONNECTED, callback: mockCallback });

      const mongodb = await MongoDB.createConnection({ mongoURI, dbName, eventEmitter });
      await mongodb.disconnect();

      expect(mockCallback).toHaveBeenCalledOnce();
    });
  });
});