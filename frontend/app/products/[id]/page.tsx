"use client"

import { use } from "react"
import { useEffect, useState } from "react"
import Image from "next/image"

const API = "http://localhost:5001/api"

export default function ProductDetail({ params }: any) {

    const { id } = use(params) as { id: string }

    const [product, setProduct] = useState<any>(null)
    const [selectedImage, setSelectedImage] = useState("")
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const [qty, setQty] = useState(1)

    const fetchProduct = async () => {
        const res = await fetch(`${API}/products/${id}`)
        const data = await res.json()
        setProduct(data)

        setSelectedImage(data.image || data.images?.[0])
    }

    useEffect(() => {
        if (id) fetchProduct()
    }, [id])

    if (!product) return <p className="p-10">Loading...</p>

    return (
        <div className="max-w-7xl mx-auto p-6">

            {/* MAIN */}
            <div className="grid md:grid-cols-2 gap-10">

                {/* LEFT - IMAGE */}
                <div>
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="rounded-xl shadow"
                        />
                    )}

                    <div className="flex gap-3 mt-4">
                        {[product.image, ...(product.images || [])].map((img: string, i: number) => (
                            <Image
                                key={i}
                                src={img}
                                alt=""
                                width={80}
                                height={80}
                                onClick={() => setSelectedImage(img)}
                                className={`cursor-pointer rounded border ${selectedImage === img ? "border-amber-500" : ""}`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT - INFO */}
                <div>

                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

                    {/* rating */}
                    <div className="text-yellow-500 mb-2">
                        ⭐ {product.rating} ({product.numReviews} reviews)
                    </div>

                    {/* price */}
                    <p className="text-2xl text-amber-600 font-semibold mb-4">
                        {product.price.toLocaleString()}đ
                    </p>

                    {/* description */}
                    <p className="text-gray-600 mb-6">
                        {product.description}
                    </p>

                    {/* SIZE */}
                    {product.sizes?.length > 0 && (
                        <div className="mb-4">
                            <p className="font-semibold mb-2">Size</p>
                            <div className="flex gap-2">
                                {product.sizes.map((s: string) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`px-3 py-1 border rounded ${selectedSize === s ? "bg-black text-white" : ""}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* COLOR */}
                    {product.colors?.length > 0 && (
                        <div className="mb-4">
                            <p className="font-semibold mb-2">Color</p>
                            <div className="flex gap-2">
                                {product.colors.map((c: string) => (
                                    <div
                                        key={c}
                                        onClick={() => setSelectedColor(c)}
                                        className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === c ? "ring-2 ring-black" : ""}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mb-6">
                        <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-1 border">-</button>
                        <span>{qty}</span>
                        <button onClick={() => setQty(q => q + 1)} className="px-3 py-1 border">+</button>
                    </div>

                    {/* BUTTON */}
                    <div className="flex gap-4">
                        <button className="bg-black text-white px-6 py-3 rounded-lg">
                            Add to Cart
                        </button>

                        <button className="bg-amber-500 text-white px-6 py-3 rounded-lg">
                            Buy Now
                        </button>
                    </div>

                    {/* EXTRA */}
                    <div className="mt-6 text-sm text-gray-500 space-y-1">
                        <p>🚚 Free shipping</p>
                        <p>↩️ 7-day return</p>
                        <p>✔️ Warranty included</p>
                    </div>

                </div>
            </div>

            {/* TABS */}
            <div className="mt-16">
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <p className="text-gray-600">{product.description}</p>
            </div>

            {/* RELATED */}
            <div className="mt-16">
                <h2 className="text-xl font-semibold mb-4">Related Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* bạn fetch thêm API sau */}
                    <div className="border p-4 rounded">Item</div>
                </div>
            </div>

        </div>
    )
}