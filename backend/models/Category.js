import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String // đường dẫn đến icon của danh mục
    }
}, {
    timestamps: true
})
export const Category = mongoose.model("Category", categorySchema)