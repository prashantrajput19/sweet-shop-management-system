import express from "express";
import { getUserData, login, register, refreshAccessToken } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post('/register', register)

router.post('/login', login)

router.post('/refresh-token', refreshAccessToken)

router.get('/user', authMiddleware, getUserData)

export default router
