import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URI

if (!URI) {
    throw new Error("Please provide MONGO_URI in the environment variables")
}

const OPTIONS = {};

export default async function connectDB() {
    try {
        await mongoose.connect(URI, OPTIONS)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(`Database connection error, ${error.message}`)
    }
}