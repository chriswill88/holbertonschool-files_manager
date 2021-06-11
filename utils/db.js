import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
const DB_PORT = process.env.DB_PORT ? process.env.DB_PORT : 27017;
const DB_DATABASE = process.env.DB_DATABASE ? process.env.DB_DATABASE : 'files_manager';
const URI = `mongodb://${DB_HOST}:${DB_PORT}`;

let client;

async function startDB() {
  client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

  await client.connect(async (err) => {
    if (err) return false;
    await client.db(DB_DATABASE);
    return true;
  });
}

class DBClient {
  constructor() {
    startDB();
    this.client = client;
  }

  isAlive() {
    if (this.client.isConnected()) return true;
    return false;
  }

  async nbUsers() {
    const users = this.client.db(DB_DATABASE).collection('users');
    return users.estimatedDocumentCount();
  }

  async nbFiles() {
    const files = this.client.db(DB_DATABASE).collection('files');
    return files.estimatedDocumentCount();
  }
}

const dbClient = new DBClient();

export default dbClient;
