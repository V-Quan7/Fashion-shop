import { SubCategory } from "../models/SubCategory.js";

export const getAllSubCategory = async (req, res) => {
    try {
        const category = await SubCategory.find()
            .populate("categoryId", "name")
        return res.status(200).json({
            data: category
        })
    } catch (error) {
        console.error("loi xay ra khi goi getAllSubCategory:", error)
        return res.status(500).json({
            message: "error sever"
        })

    }
}
export const createSubCategory = async (req, res) => {
    try {
        const { name, categoryId, category_id } = req.body
        console.log("BODY:", req.body);
        const subcategory = await SubCategory.create({
            name,
            categoryId: category_id || categoryId
        })
        return res.status(201).json({
            data: subcategory
        })

    } catch (error) {
        console.error("loi xay ra khi goi createSubCategory:", error)
        return res.status(500).json({
            massage: "loi he thong "
        })

    }
}
export const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name, categoryId } = req.body
        const NewSubCategory = await SubCategory.findByIdAndUpdate(id, { name, categoryId }, { new: true, runValidators: true })

        if (!NewSubCategory) {
            return res.status(404).json({
                message: "khong tim thay"
            })
        }
        return res.status(201).json({
            data: NewSubCategory
        })
    } catch (error) {
        console.error("loi xay ra khi goi updateSubCategory:", error)
        return res.status(500).json({
            message: "loi he thong"
        })
    }
}
export const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params
        const deleteSubCategory = await SubCategory.findByIdAndDelete(id)
        if (!deleteSubCategory) {
            return res.status(404).json({
                message: "khong tim thay"
            })
            return res.status(201).json({
                message: "da xoa thanh cong"
            })
        }
    } catch (error) {
        console.error("loi xay ra khi goi deleteSubCategory:", error)
        return res.status(500).json({
            message: "loi he thong"
        })

    }
}