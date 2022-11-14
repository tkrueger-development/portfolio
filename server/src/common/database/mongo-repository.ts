import { Db, Document, Collection, AggregationCursor, InsertOneResult, ObjectId, WithId } from 'mongodb';

import { InternalServerException } from '../exceptions/internal-server-exception';
import { NotFoundException } from '../exceptions/not-found-exception';
import { Event, AppEvents } from '../services/event';

class MongoRepository<T extends Document> {
  private collection: Collection | null = null;
  private readonly eventEmitter: Event<AppEvents>;
  private readonly collectionName: string;

  constructor({ eventEmitter, collectionName }: { eventEmitter: Event<AppEvents>, collectionName: string }) {
    this.eventEmitter   = eventEmitter;
    this.collectionName = collectionName;

    this.registerForDatabaseEvents();
  }

  private registerForDatabaseEvents() {
    const db = this.eventEmitter.querySubscribe<Db>({ event: AppEvents.MONGODB_CONNECTED, callback: (db: Db) => { 
      this.collection = db.collection(this.collectionName);
    }});

    if (db !== null) { 
      this.collection = db.collection(this.collectionName);
    }

    this.eventEmitter.subscribe({ 
      event: AppEvents.MONGODB_DISCONNECTED, 
      callback: () => this.collection = null
    });
  }

  async findOne({ filter }: { filter: Omit<Partial<T>, 'id'> & { _id: ObjectId } }): Promise<T & { id: string }> {
    if (!this.collection) throw new InternalServerException('Repository not connected to database');

    const projection = {
      _id:             0,
      id:         '$_id',
      createdOn:       1,
      modifiedOn:      1,
      brand:           1,
      name:            1,
      category:        1,
      imagePath:       1,
      imageGallery:    1,
      description:     1,
      ratingAverage:   1,
      ratingNum:       1,
      variants:        1,
    };

    const document = await this.collection.findOne<WithId<T>>(filter, { projection });

    if (!document) throw new NotFoundException('Could not find document.');

    const transformed: Record<string, any> = {};
    Object.keys(document).forEach((key) => {
      if (key === '_id') {
        transformed['id'] = document[key];
        return;
      }

      transformed[key] = document[key];
    });

    return transformed as unknown as T & { id: string };
  }

  async insertOne({ document }: { document: Omit<T, 'id' | 'createdOn' | 'modifiedOn'> }): Promise<InsertOneResult> {
    if (!this.collection) throw new InternalServerException('Repository not connected to database.');

    const documentWithTimestamps = {
      ...document,
      createdOn: Date.now(),
      modifiedOn: Date.now(),
    };

    return await this.collection.insertOne(documentWithTimestamps);
  }

  aggregate({ pipeline }: { pipeline: Array<object> }): AggregationCursor {
    if (!this.collection) throw new InternalServerException('Repository not connected to database.');

    return this.collection.aggregate(pipeline);
  }
}

export { MongoRepository };