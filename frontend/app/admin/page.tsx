"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminDashboard() {

    const [totalProducts, setTotalProducts] = useState(0)
    const [totalCategories, setTotalCategories] = useState(0)
    const [totalSubCategories, setTotalSubCategories] = useState(0)

    // 🔥 Lấy dữ liệu tổng
    const fetchData = async () => {
        try {
            const [p, c, s] = await Promise.all([
                fetch("http://localhost:5001/api/products"),
                fetch("http://localhost:5001/api/category"),
                fetch("http://localhost:5001/api/subcategory"),
            ])
            const products = await p.json()
            const categories = await c.json()
            const subcategories = await s.json()

            setTotalProducts(products.data.length)
            setTotalCategories(categories.data.length)
            setTotalSubCategories(subcategories.data.length)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h1 className="text-3xl font-bold mb-">Dashboard</h1>

            {/* 🔥 Thống kê */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">Products</h2>
                    <p className="text-2xl font-bold">{totalProducts}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">Categories</h2>
                    <p className="text-2xl font-bold">{totalCategories}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">SubCategories</h2>
                    <p className="text-2xl font-bold">{totalSubCategories}</p>
                </div>

            </div>
            {/* 🔥 Quick actions */}
            <div className="grid grid-cols-3 gap-6">

                <Link href="/admin/products">
                    <div className="bg-blue-500 text-white p-6 rounded-xl hover:bg-blue-600 cursor-pointer">
                        ➕ Quản lý sản phẩm
                    </div>
                </Link>

                <Link href="/admin/category">
                    <div className="bg-green-500 text-white p-6 rounded-xl hover:bg-green-600 cursor-pointer">
                        📁 Quản lý category
                    </div>
                </Link>

                <Link href="/admin/subcategory">
                    <div className="bg-purple-500 text-white p-6 rounded-xl hover:bg-purple-600 cursor-pointer">
                        📂 Quản lý subcategory
                    </div>
                </Link>
            </div>
        </div>
    )
}


















































// import { useState } from "react"

// export default function Admin() {
//     const [name, setName] = useState("")
//     const [price, setPrice] = useState("")
//     const [colors, setColors] = useState("")
//     const [sizes, setSizes] = useState("")

//     const handleSubmit = async () => {
//         await fetch("http://localhost:5001/api/products", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ name, price, colors, sizes })
//         })
//     }
//     return (

//         <div className="flex items-center justify-center mt-10">
//             <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px] space-y-4">

//                 <h2 className="text-xl font-semibold text-center">
//                     Thêm sản phẩm
//                 </h2>

//                 <input
//                     className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="Màu"
//                     onChange={(e) => setColors(e.target.value)}
//                 />

//                 <input
//                     className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="Size"
//                     onChange={(e) => setSizes(e.target.value)}
//                 />

//                 <input
//                     className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="Tên"
//                     onChange={(e) => setName(e.target.value)}
//                 />

//                 <input
//                     className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     placeholder="Giá"
//                     onChange={(e) => setPrice(e.target.value)}
//                 />

//                 <button
//                     onClick={handleSubmit}
//                     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                 >
//                     Thêm
//                 </button>

//             </div>
//         </div>
//     )
// }