import express from 'express'
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../controllers/CategoryController1.js'
import upload from '../middlewares/uploadCloud.js'
const router = express.Router()

router.post("/", upload.single('icon'), createCategory)
router.get("/", getAllCategory)
router.put("/:id", upload.single('icon'), updateCategory)
router.delete("/:id", deleteCategory)

export default router