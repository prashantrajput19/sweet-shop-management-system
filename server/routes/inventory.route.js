import express from "express";
import { purchase, restock, userPurchased } from "../controllers/inventory.controller.js";

const router = express.Router();

router.post('/:id/purchase', purchase)

router.post('/:id/restock', restock)

router.get('/user/purchased', userPurchased)

export default router
