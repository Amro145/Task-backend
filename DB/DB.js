import mongoose from "mongoose"

// Track connection state globally for serverless environments (Vercel)
let isConnected = false;

export const ConnectToDb = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            throw new Error("DB_URL is not defined in environment variables");
        }

        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000, // Optional: Fail faster if no connection
        });

        isConnected = true;
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        throw error; // Rethrow to ensure callers can handle connection failure
    }
}