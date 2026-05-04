import mongoose from "mongoose"

// 🔹 REVIEW
const reviewSchema = new mongoose.Schema({
    user: String,
    rating: Number,
    comment: String,
}, { timestamps: true })

// 🔹 VARIANT (size + màu + stock)
const variantSchema = new mongoose.Schema({
    size: String,
    color: String,
    stock: {
        type: Number,
        default: 0
    }
})

const productSchema = new mongoose.Schema({

    // 🔥 BASIC
    name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        unique: true
    },

    description: String,

    brand: String,

    // 🔥 PRICE
    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0
    },

    finalPrice: Number,

    // 🔥 CATEGORY
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },

    // 🔥 IMAGE
    image: String,
    images: [String],

    // 🔥 OPTIONS
    sizes: [String],
    colors: [String],

    // 🔥 QUAN TRỌNG
    variants: [variantSchema],

    // 🔥 STOCK
    stock: {
        type: Number,
        default: 0
    },

    sold: {
        type: Number,
        default: 0
    },

    // 🔥 REVIEW
    rating: {
        type: Number,
        default: 0
    },

    numReviews: {
        type: Number,
        default: 0
    },

    reviews: [reviewSchema]

}, {
    timestamps: true
})

/* =========================
   🔥 AUTO LOGIC (KHÔNG DÙNG next)
========================= */

productSchema.pre("save", function () {

    // 👉 tạo slug
    if (!this.slug) {
        this.slug = this.name
            .toLowerCase()
            .trim()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")
    }

    // 👉 tính giá sau giảm
    if (this.discount > 0) {
        this.finalPrice = this.price - (this.price * this.discount) / 100
    } else {
        this.finalPrice = this.price
    }

    // 👉 tính tổng stock từ variants
    if (this.variants && this.variants.length > 0) {
        this.stock = this.variants.reduce(
            (sum, v) => sum + (v.stock || 0), 0
        )
    }
})

export const Product = mongoose.model("Product", productSchema)