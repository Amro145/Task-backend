import express from "express";
import { logout, signin, signup, getMe } from "../Controller/UserController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;
