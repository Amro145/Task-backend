import mongoose from "mongoose"

export const ConnectToDb = async () => {
    // 1 = connected, 2 = connecting
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        return;
    }

    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            throw new Error("DB_URL is not defined in environment variables");
        }

        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        throw error; // Rethrow to ensure callers can handle connection failure
    }
}