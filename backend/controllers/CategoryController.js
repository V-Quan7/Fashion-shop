import { Category } from "../models/Category.js"

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const icon = req.file ? req.file.path : ""
        if (name.length == 0) {
            return res.status(400).json({
                message: 'Vui lòng nhập tên danh mục'
            })
        }
        const category = await Category.create({
            name,
            icon
        })
        return res.status(201).json({
            data: category
        })

    } catch (error) {
        console.error("Lỗi xảy ra khi gọi createCategory: ", error)
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find()
        return res.status(200).json({
            data: category
        })

    } catch (error) {
        console.error("lỗi xay ra khi gọi getAllCategory: ", error)
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const icon = req.file ? req.file.path : ""
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        const newCategory = await Category.findByIdAndUpdate(id, { name, slug, icon }, { new: true, runValidators: true });
        if (!newCategory) {
            return res.status(404).json({ message: "Khong tim thay" })
        }

        return res.status(201).json({ data: newCategory })

    } catch (error) {
        console.error("lỗi xảy ra khi goi updatecatagory:", error)
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })
    }
}
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const deleteCategory = await Category.findByIdAndDelete(id)
        if (!deleteCategory) {
            return res.status(404).json({ message: "Khong tim thay" })
        }

        return res.status(201).json({ message: "da xoa thanh cong" })

    } catch (error) {
        console.error("lỗi xảy ra khi con updatecatagory:", error)
        return res.status(500).json({
            message: "Lỗi hệ thống"
        })

    }
}