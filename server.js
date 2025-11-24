import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser';
import taskRoutes from "./Routes/TaskRoutes.js"
import { ConnectToDb } from "./DB/DB.js"
dotenv.config()

const app = express()
app.listen(process.env.PORT || 5000, async () => {
    try {
        await ConnectToDb()
        console.log(`Server is running on port ${process.env.PORT}`)
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
app.use("/api", taskRoutes)