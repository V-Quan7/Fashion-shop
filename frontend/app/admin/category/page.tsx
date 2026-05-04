"use client"
import { useEffect, useState } from "react"
import { Category } from "@/types/product.js"
export default function CategoryPage() {

    const [categories, setCategories] = useState<Category[]>([])
    const [name, setName] = useState("")
    const [icon, setIcon] = useState<File | null>(null)


    // 🔥 modal state
    const [open, setOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    // ================= GET =================
    const fetchData = async () => {
        const res = await fetch("http://localhost:5001/api/category")
        const data = await res.json()
        setCategories(data.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    // ================= ADD / UPDATE =================
    const handleSubmit = async () => {
        if (!name) return alert("Nhập tên")

        const formData = new FormData()
        formData.append("name", name)
        if (icon) {
            formData.append("icon", icon)
        }

        if (editingId) {
            // UPDATE
            await fetch(`http://localhost:5001/api/category/${editingId}`, {
                method: "PUT",
                body: formData
            })
        } else {
            // ADD
            await fetch("http://localhost:5001/api/category", {
                method: "POST",
                body: formData
            })
        }

        setName("")
        setIcon(null)
        setEditingId(null)
        setOpen(false)
        fetchData()
    }

    // ================= DELETE =================
    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Xóa category này?")
        if (!confirmDelete) return

        await fetch(`http://localhost:5001/api/category/${id}`, {
            method: "DELETE"
        })

        fetchData()
    }

    // ================= OPEN EDIT =================
    const handleEdit = (c: Category) => {
        setName(c.name)
        setIcon(null) // Reset icon khi edit
        setEditingId(c._id)
        setOpen(true)
    }
    return (
        <div>

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Category</h1>

                <button
                    onClick={() => {
                        setOpen(true)
                        setEditingId(null)
                        setName("")
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Thêm Category
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Icon</th>
                            <th className="p-3 text-left">Tên</th>
                            <th className="p-3 text-right">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((c) => (
                            <tr key={c._id} className="border-t">

                                <td className="p-3">
                                    {c.icon && (
                                        <img
                                            src={c.icon}
                                            alt={c.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    )}
                                </td>

                                <td className="p-3">{c.name}</td>

                                <td className="p-3 text-right space-x-2">

                                    <button
                                        onClick={() => handleEdit(c)}
                                        className="px-3 py-1 bg-yellow-400 rounded"
                                    >
                                        Sửa
                                    </button>

                                    <button
                                        onClick={() => handleDelete(c._id)}
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
                            {editingId ? "Sửa Category" : "Thêm Category"}
                        </h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Icon (tùy chọn)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setIcon(e.target.files?.[0] || null)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên category
                            </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập tên category"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Hủy
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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