import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalForMongo.mongoClientPromise) {
    client = new MongoClient(uri);
    globalForMongo.mongoClientPromise = client.connect();
  }

  clientPromise = globalForMongo.mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;