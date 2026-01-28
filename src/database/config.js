import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "dars_db";

const client = new MongoClient(url);

let db;
let users;
let posts;

export const connectDb = async () => {
    if (!db) {
        await client.connect();
        db = client.db(dbName);
        users = db.collection("users");
        posts = db.collection("posts");
        console.log("db connected");
    }
    return { db, users, posts };
};

await connectDb();

export default {
    get db() {
        return db;
    },
    get users() {
        return users;
    },
    get posts() {
        return posts;
    }
};