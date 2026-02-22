import 'dotenv/config';
import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import taskRoutes from "./Routes/TaskRoutes.js"
import userRoutes from "./Routes/UserRoutes.js"
import { ConnectToDb } from "./DB/DB.js"

const app = express()
const PORT = process.env.PORT || 5000;

// Connect to Database immediately
ConnectToDb().catch(err => {
    console.error("Initial DB connection failed:", err);
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173","https://task-manger-sigma.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api", taskRoutes)

// Listen only if running directly (not in a serverless environment like Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

export default app;