import mongoose from 'mongoose'

// Tạo cấu trúc sản phẩm
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true // bắt buộc có tên
    },

    price: {
        type: Number,
        required: true // bắt buộc có giá
    },
    sizes: {
        type: [String] // ví dụ: ["S", "M", "L"]

    },

    description: {
        type: String // mô tả sản phẩm
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true // ví dụ: Unisex
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true // ví dụ: Unisex
    },

    image: {
        type: String // ảnh chính
    },

    images: [
        {
            type: String // nhiều ảnh
        }
    ],
    colors: [
        {
            type: String // danh sách màu (hex hoặc text)
        }
    ],

    rating: {
        type: Number,
        default: 0 // mặc định = 0
    },

    numReviews: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true // tự tạo createdAt, updatedAt
})
export const Product = mongoose.model('Product', productSchema)

