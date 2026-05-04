import express from "express";
import { createSubCategory, getAllSubCategory, updateSubCategory, deleteSubCategory } from "../controllers/subCategorycontroller.js";

const router = express.Router();

router.get("/", getAllSubCategory)
router.post("/", createSubCategory)
router.put("/:id", updateSubCategory)
router.delete("/:id", deleteSubCategory)
export default router