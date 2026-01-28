import database from "../database/config.js";
import { ObjectId } from "mongodb";

const { users } = database;

class UserServices {
    async POST(body) {
        const user = {
            ...body,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return await users.insertOne(user);
    }
    
    async GET() {
        return await users.find({}).toArray();
    }
    
    async GETONE(id) {
        return await users.findOne({ _id: new ObjectId(id) });
    }
    
    async GETBYEMAIL(email) {
        return await users.findOne({ email });
    }
    
    async PUT(id, body) {
        body.updatedAt = new Date();
        return await users.updateOne(
            { _id: new ObjectId(id) }, 
            { $set: body }
        );
    }
    
    async DEL(id) {
        return await users.deleteOne({ _id: new ObjectId(id) });
    }
}

export default new UserServices();