"use client";
import { useEffect, useState } from "react";
import { Product, Category, SubCategory } from "@/types/product";
import {
    PencilSquareIcon,
    TrashIcon,
    PlusIcon,
    XMarkIcon
} from "@heroicons/react/24/solid";

const API = "http://localhost:5001/api";

export default function AdminProducts() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [colors, setColors] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [CategoryId, setCategoryId] = useState("");
    const [SubCategoryId, setSubCategoryId] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [existingImage, setExistingImage] = useState<string>("");
    const [openModal, setOpenModal] = useState(false);
    const [filterCategoryId, setFilterCategoryId] = useState("");
    const [filterSubCategoryId, setFilterSubCategoryId] = useState("");
    const [search, setSearch] = useState("");

    // ================= FETCH =================
    const fetchData = async () => {
        const [catRes, subRes, prodRes] = await Promise.all([
            fetch(`${API}/category`),
            fetch(`${API}/subcategory`),
            fetch(`${API}/products`)
        ]);

        const catData = await catRes.json();
        const subData = await subRes.json();
        const prodData = await prodRes.json();

        setCategories(catData.data || []);
        setSubCategories(subData.data || []);
        setProducts(prodData.data || []);

        if (catData.data?.length > 0) {
            setCategoryId(catData.data[0]._id);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ================= FILTER =================
    const filteredSubForForm = subCategories.filter(
        (s) =>
            (typeof s.categoryId === "string"
                ? s.categoryId
                : s.categoryId?._id) === CategoryId
    );

    const filteredSubForFilter = subCategories.filter(
        (s) =>
            (typeof s.categoryId === "string"
                ? s.categoryId
                : s.categoryId?._id) === filterCategoryId
    );

    const filteredProducts = products.filter((p) => {
        const productCategoryId = typeof p.categoryId === "string" ? p.categoryId : p.categoryId?._id;
        const productSubCategoryId = typeof p.subCategoryId === "string" ? p.subCategoryId : p.subCategoryId?._id;

        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

        return (
            matchesSearch &&
            (!filterCategoryId || productCategoryId === filterCategoryId) &&
            (!filterSubCategoryId || productSubCategoryId === filterSubCategoryId)
        );
    });

    // ================= SUBMIT =================
    const handleSubmit = async () => {
        if (!name || !CategoryId || !SubCategoryId) {
            return alert("Thiếu dữ liệu");
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", String(price));
        formData.append("description", description);
        formData.append("colors", JSON.stringify(colors));
        formData.append("sizes", JSON.stringify(sizes));
        formData.append("categoryId", CategoryId);
        formData.append("subCategoryId", SubCategoryId);

        if (image) formData.append("image", image);

        if (editingId) {
            await fetch(`${API}/products/${editingId}`, {
                method: "PUT",
                body: formData
            });
        } else {
            await fetch(`${API}/products`, {
                method: "POST",
                body: formData
            });
        }

        resetForm();
        fetchData();
        setOpenModal(false);
    };

    const resetForm = () => {
        setName("");
        setPrice(0);
        setDescription("");
        setColors([]);
        setSizes([]);
        setEditingId(null);
        setImage(null);
        setExistingImage("");
    };

    // ================= DELETE =================
    const handleDelete = async (id: string) => {
        if (!confirm("Xóa sản phẩm?")) return;
        await fetch(`${API}/products/${id}`, {
            method: "DELETE"
        });
        fetchData();
    };

    // ================= EDIT =================
    const handleEdit = (p: Product) => {
        setName(p.name);
        setPrice(p.price);
        setDescription(p.description ?? "");
        setColors(p.colors || []);
        setSizes(p.sizes || []);
        setCategoryId(p.categoryId?._id || "");
        setSubCategoryId(p.subCategoryId?._id || "");
        setExistingImage(p.image ?? "");
        setEditingId(p._id);
        setOpenModal(true);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Quản lý sản phẩm
                </h1>

                <button
                    onClick={() => {
                        resetForm();
                        setOpenModal(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow"
                >
                    <PlusIcon className="w-5 h-5" />
                    Thêm sản phẩm
                </button>
            </div>

            {/* TABLE CARD */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between bg-slate-50 border-b border-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <label className="text-sm font-medium text-slate-700">Lọc:</label>
                        <input
                            placeholder="Tìm sản phẩm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
                        />
                        <select
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
                            value={filterCategoryId}
                            onChange={(e) => {
                                setFilterCategoryId(e.target.value);
                                setFilterSubCategoryId("");
                            }}
                        >
                            <option value="">Tất cả Category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
                            value={filterSubCategoryId}
                            onChange={(e) => setFilterSubCategoryId(e.target.value)}
                        >
                            <option value="">Tất cả SubCategory</option>
                            {filteredSubForFilter.map((s) => (
                                <option key={s._id} value={s._id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-50 text-gray-600 text-sm">
                        <tr>
                            <th className="p-4 text-left">Ảnh</th>
                            <th className="p-4 text-left">Tên</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">SubCategory</th>
                            <th className="p-4 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((p) => (
                            <tr
                                key={p._id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="p-4">
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="h-12 w-12 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-xl bg-slate-100" />
                                    )}
                                </td>
                                <td className="p-4 font-medium text-gray-800 max-w-[220px] truncate">
                                    <span className="truncate block">{p.name}</span>
                                </td>
                                <td className="p-4">{p.categoryId?.name}</td>
                                <td className="p-4">{p.subCategoryId?.name}</td>

                                <td className="p-4 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg text-white"
                                    >
                                        <PencilSquareIcon className="w-4 h-4" />
                                        Sửa
                                    </button>

                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {openModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl relative">

                        {/* CLOSE */}
                        <button
                            onClick={() => setOpenModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold mb-4">
                            {editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Hình ảnh sản phẩm</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
                                />
                                {existingImage && !image && (
                                    <img
                                        src={existingImage}
                                        alt="Preview"
                                        className="mt-3 h-28 w-28 rounded-xl object-cover"
                                    />
                                )}
                                {image && (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        className="mt-3 h-28 w-28 rounded-xl object-cover"
                                    />
                                )}
                            </div>

                            <input
                                className="input"
                                placeholder="Tên sản phẩm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                className="input"
                                placeholder="Giá"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />

                            <textarea
                                className="input col-span-2"
                                placeholder="Mô tả"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <input
                                className="input"
                                placeholder="Màu sắc"
                                value={colors.join(", ")}
                                onChange={(e) => setColors(e.target.value.split(", ").filter(Boolean))}
                            />

                            <input
                                className="input"
                                placeholder="Kích thước"
                                value={sizes.join(", ")}
                                onChange={(e) => setSizes(e.target.value.split(", ").filter(Boolean))}
                            />

                            <select
                                className="input"
                                value={CategoryId}
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                    setSubCategoryId("");
                                }}
                            >
                                <option value="">Category</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="input"
                                value={SubCategoryId}
                                onChange={(e) => setSubCategoryId(e.target.value)}
                            >
                                <option value="">SubCategory</option>
                                {filteredSubForForm.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
                        >
                            {editingId ? "Cập nhật" : "Thêm sản phẩm"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}