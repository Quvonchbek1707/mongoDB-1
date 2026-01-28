import database from "../database/config.js";
import { ObjectId } from "mongodb";

const { posts, users } = database;

class PostServices {
    async POST(body) {
        if (!body.userId) {
            throw new Error("userId is required");
        }
        const userExists = await users.findOne({ _id: new ObjectId(body.userId) });
        if (!userExists) {
            throw new Error("User not found with the provided userId");
        }
        const post = {
            ...body,
            userId: new ObjectId(body.userId),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return await posts.insertOne(post);
    }
    
    async GET() {
        return await posts.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    userId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "user.name": 1,
                    "user.email": 1
                }
            }
        ]).toArray();
    }
    async GETONE(id) {
        const result = await posts.aggregate([
            { $match: { _id: new ObjectId(id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    userId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "user.name": 1,
                    "user.email": 1
                }
            }
        ]).toArray();
        return result[0] || null;
    }
    async PUT(id, body) {
        if (body.userId) {
            const userExists = await users.findOne({ _id: new ObjectId(body.userId) });
            if (!userExists) {
                throw new Error("User not found with the provided userId");
            }
            body.userId = new ObjectId(body.userId);
        } 
        body.updatedAt = new Date();
        return await posts.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: body }
        );
    } 
    async DEL(id) {
        return await posts.deleteOne({ _id: new ObjectId(id) });
    }
}

export default new PostServices();