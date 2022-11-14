import { Db, MongoClient, Document } from 'mongodb';
class MongoSeeder {

  static async create({ mongoURI, dbName }: { mongoURI: string, dbName: string }): Promise<MongoSeeder> {
    const mongoClient = new MongoClient(mongoURI);

    const client = await mongoClient.connect();

    return new MongoSeeder({ client, dbName });
  }

  private db: Db;
  private client: MongoClient;

  private constructor({ client, dbName }: { client: MongoClient, dbName: string }) {
    this.client = client;
    this.db = client.db(dbName);
  }

  async seed({ collectionName, inputData }: { collectionName: string, inputData: Array<Document> }): Promise<boolean> {

    try {
      await this.db.collection(collectionName).insertMany(inputData);
      return true;
    } catch (ex: unknown) { 
      console.error(ex); 
      return false;
    }
  }

  async wipe({ collectionName }: { collectionName: string }): Promise<boolean> {
    try {
      await this.db.collection(collectionName).deleteMany({});
      return true;
    } catch (ex: unknown) {
      console.error(ex);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }
}

export { MongoSeeder };