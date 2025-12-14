import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod;

export const connect = async () => {
    try {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();

        await mongoose.disconnect(); // Disconnect default connection
        await mongoose.connect(uri);
    } catch (error) {
        console.error("Error connecting to in-memory database:", error);
        process.exit(1);
    }
};

export const closeDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        if (mongod) {
            await mongod.stop();
        }
    } catch (error) {
        console.error("Error closing in-memory database:", error);
    }
};

export const clearDatabase = async () => {
    try {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    } catch (error) {
        console.error("Error clearing in-memory database:", error);
    }
};
