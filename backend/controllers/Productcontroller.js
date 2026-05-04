import { Product } from '../models/Product.js'

// 📌 LẤY DANH SÁCH SẢN PHẨM
export const getProducts = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.query
        let filter = {}

        if (categoryId) {
            filter.categoryId = categoryId
        }

        if (subCategoryId) {
            filter.subCategoryId = subCategoryId
        }

        const products = await Product.find(filter)
            .populate('categoryId', 'name')
            .populate('subCategoryId', 'name')

        res.json({
            success: true,
            data: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
}

// 📌 LẤY CHI TIẾT SẢN PHẨM
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)
            .populate('categoryId', 'name')
            .populate('subCategoryId', 'name')

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            })
        }

        res.json(product)

    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error)
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
}

// 📌 CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            categoryId,
            subCategoryId,
            images,
            colors,
            sizes,
            discount,
            variants
        } = req.body

        const image = req.file ? req.file.path : ""

        const newProduct = await Product.create({
            name,
            price,
            description,
            categoryId,
            subCategoryId,
            image,
            images,
            colors,
            sizes,
            discount: discount || 0,
            variants: variants || []
        })

        res.status(201).json({
            success: true,
            data: newProduct
        })

    } catch (error) {
        console.error("Lỗi createProduct:", error)
        res.status(500).json({
            message: 'Lỗi server'
        })
    }
}

// 📌 UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const {
            name,
            price,
            description,
            categoryId,
            subCategoryId,
            images,
            colors,
            sizes,
            discount,
            variants
        } = req.body

        const image = req.file ? req.file.path : undefined

        const updateData = {
            name,
            price,
            description,
            categoryId,
            subCategoryId,
            images,
            colors,
            sizes,
            discount,
            variants
        }

        if (image) {
            updateData.image = image
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm'
            })
        }

        res.json({
            success: true,
            data: updatedProduct
        })

    } catch (error) {
        console.error("Lỗi updateProduct:", error)
        res.status(500).json({
            message: 'Lỗi server'
        })
    }
}

// 📌 DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await Product.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({
                message: 'Không tìm thấy sản phẩm'
            })
        }

        res.json({
            success: true,
            message: 'Đã xóa thành công'
        })

    } catch (error) {
        console.error("Lỗi deleteProduct:", error)
        res.status(500).json({
            message: 'Lỗi server'
        })
    }
}