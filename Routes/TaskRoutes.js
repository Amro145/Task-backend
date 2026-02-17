import express from "express"
import { CompleteTask, CreateTask, DeleteTask, GetTask, GetTasks, UpdateTask } from "../Controller/TaskController.js"
import { protect } from "../Middleware/authMiddleware.js"

const router = express.Router()

router.use(protect)

router.get("/", GetTasks)
router.post("/", CreateTask)

router.get("/task/:id", GetTask)
router.put("/UpdateTask/:id", UpdateTask)
router.put("/CompleteTask/:id", CompleteTask)
router.delete("/DeleteTask/:id", DeleteTask)

export default router