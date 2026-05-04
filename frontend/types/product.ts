export type Product = {
    _id: string

    //  BASIC
    name: string
    slug?: string
    description?: string
    brand?: string

    //  PRICE
    price: number
    discount?: number
    finalPrice?: number

    //  CATEGORY
    categoryId: Category
    subCategoryId: SubCategory

    //  IMAGE
    image?: string
    images?: string[]

    //  OPTIONS
    sizes?: string[]
    colors?: string[]

    //  VARIANT (QUAN TRỌNG)
    variants?: {
        size: string
        color: string
        stock: number
    }[]

    //  STOCK
    stock?: number
    sold?: number

    //  REVIEW
    rating: number
    numReviews: number
    reviews?: {
        user: string
        rating: number
        comment: string
        createdAt?: string
    }[]

    //  TIME
    createdAt: string
    updatedAt: string
}
export type Category = {
    name: string
    _id: string
    slug: string
    icon?: string
    productCount?: number
}
export type SubCategory = {
    name: string
    _id: string
    categoryId: Category
}