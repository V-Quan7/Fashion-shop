import express from 'express'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js'
import upload from '../middlewares/uploadCloud.js'
const router = express.Router()

// API: GET /api/products
router.get('/', getProducts)
// API: GET /api/products/:id
router.get('/:id', getProductById)
router.post('/', upload.single('image'), createProduct)//new
router.put('/:id', upload.single('image'), updateProduct)
router.delete('/:id', deleteProduct)

export default router