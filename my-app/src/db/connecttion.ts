import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.PASSWORD_MONGODB;

if (!uri) {
  throw new Error("MONGODB ENV must be provided");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const DB = client.db("Revi_Store");
export default DB;
