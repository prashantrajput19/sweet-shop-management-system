import express from "express";
import { addNewSweet, deleteSweetById, getAllSweets, searchSweets, updateSweetById } from "../controllers/sweets.controller.js";

const router = express.Router();

router.post('/sweets', addNewSweet)

router.get('/sweets', getAllSweets)

router.get('/sweets/search', searchSweets)

router.put('/sweets/:id', updateSweetById)

router.delete('/sweets/:id', deleteSweetById)

export default router
