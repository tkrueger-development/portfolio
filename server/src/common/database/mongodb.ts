import { MongoClient, Db, Collection, Document } from 'mongodb';
import { Event, AppEvents } from '../services/event';

class MongoDB {
  static async createConnection({ mongoURI, dbName, eventEmitter }: { mongoURI: string, dbName: string, eventEmitter: Event<AppEvents> }): Promise<MongoDB> {
    const client = await ( new MongoClient(mongoURI) ).connect();
    
    return new MongoDB({ client, dbName, eventEmitter });
  }

  private database: Db;
  private client: MongoClient;
  private eventEmitter: Event<AppEvents>;

  constructor({ client, dbName, eventEmitter }: { client: MongoClient, dbName: string, eventEmitter: Event<AppEvents> }) {
    this.client         = client;
    this.eventEmitter   = eventEmitter;
    this.database       = client.db(dbName);

    this.eventEmitter.broadcast<Db>({ event: AppEvents.MONGODB_CONNECTED, payload: this.database });
  }

  getCollection<T extends Document>({ collectionName }: { collectionName: string }): Collection<T> {  
    return this.database.collection<T>(collectionName);
  }

  async disconnect(): Promise<void> {
    await this.client.close();

    this.eventEmitter.broadcast({ event: AppEvents.MONGODB_DISCONNECTED });
  }
}

export { MongoDB };