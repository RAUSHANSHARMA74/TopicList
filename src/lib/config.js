"use server"
import mongoose from 'mongoose';

const mongoDB = process.env.NEXT_PUBLIC_MONGODB;
const connectDB = async () => {
    try {
        await mongoose.connect(mongoDB);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;