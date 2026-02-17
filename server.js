import 'dotenv/config';
import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
import taskRoutes from "./Routes/TaskRoutes.js"
import userRoutes from "./Routes/UserRoutes.js"
import { ConnectToDb } from "./DB/DB.js"

const app = express()
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    try {
        await ConnectToDb()
        console.log(`Server is running on port ${PORT}`)
    } catch (err) {
        console.log(err)
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use("/api/users", userRoutes)
app.use("/api", taskRoutes)