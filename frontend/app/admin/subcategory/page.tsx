"use client"
import { useEffect, useState } from "react"
type Category = {
    _id: string
    name: string
}
type SubCategory = {
    _id: string
    name: string
    categoryId: Category
}
export default function SubCategoryPage() {

    const [subCategories, setSubCategories] = useState<SubCategory[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    const [name, setName] = useState("")
    const [categoryId, setCategoryId] = useState("")

    // modal
    const [open, setOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    // ================= FETCH =================
    const fetchData = async () => {
        const [sub, cat] = await Promise.all([
            fetch("http://localhost:5001/api/subcategory"),
            fetch("http://localhost:5001/api/category")
        ])

        const subData = await sub.json()
        const catData = await cat.json()

        setSubCategories(subData.data)
        setCategories(catData.data)

        if (catData.data.length > 0) {
            setCategoryId(catData.data[0]._id)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // ================= ADD / UPDATE =================
    const handleSubmit = async () => {

        if (!name || !categoryId) return alert("Thiếu dữ liệu")

        if (editingId) {
            // UPDATE
            await fetch(`http://localhost:5001/api/subcategory/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, categoryId })
            })
        } else {
            // ADD
            await fetch("http://localhost:5001/api/subcategory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, categoryId })
            })
        }

        setName("")
        setEditingId(null)
        setOpen(false)
        fetchData()
    }

    // ================= DELETE =================
    const handleDelete = async (id: string) => {
        if (!confirm("Xóa subcategory này?")) return

        await fetch(`http://localhost:5001/api/subcategory/${id}`, {
            method: "DELETE"
        })

        fetchData()
    }

    // ================= EDIT =================
    const handleEdit = (s: SubCategory) => {
        setName(s.name)
        setCategoryId(s.categoryId?._id)
        setEditingId(s._id)
        setOpen(true)
    }

    return (
        <div>

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">SubCategory</h1>

                <button
                    onClick={() => {
                        setOpen(true)
                        setEditingId(null)
                        setName("")
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Thêm SubCategory
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Tên</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-right">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {subCategories.map((s) => (
                            <tr key={s._id} className="border-t">

                                <td className="p-3">{s.name}</td>
                                <td className="p-3">
                                    {s.categoryId?.name || "Không có"}
                                </td>

                                <td className="p-3 text-right space-x-2">

                                    <button
                                        onClick={() => handleEdit(s)}
                                        className="px-3 py-1 bg-yellow-400 rounded"
                                    >
                                        Sửa
                                    </button>

                                    <button
                                        onClick={() => handleDelete(s._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Xóa
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div className="bg-white p-6 rounded-xl w-[400px]">

                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? "Sửa SubCategory" : "Thêm SubCategory"}
                        </h2>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tên subcategory"
                            className="border p-2 w-full mb-3"
                        />

                        {/* 🔥 SELECT CATEGORY */}
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="border p-2 w-full mb-4"
                        >
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Hủy
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                {editingId ? "Cập nhật" : "Thêm"}
                            </button>
                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}