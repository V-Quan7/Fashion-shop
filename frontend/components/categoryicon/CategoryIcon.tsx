"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Category, Product } from "@/types/product.js";

const API = "http://localhost:5001/api";

export default function CategoryIcon() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API}/category`);
                const data = await res.json();
                setCategories(data.data || []);
                setProducts(data.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="w-full overflow-hidden rounded-4xl bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
            </div>
            <div className="flex gap-6 overflow-x-auto pb-3 scroll-smooth scrollbar-hide">
                {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="min-w-[200px] animate-pulse rounded-3xl bg-slate-100 px-4 py-5 flex flex-row items-center gap-4"
                        >
                            <div className="h-16 w-16 rounded-full bg-slate-200" />
                            <div className="flex-1">
                                <div className="h-4 w-3/4 rounded-full bg-slate-200" />
                                <div className="mt-2 h-3 w-1/2 rounded-full bg-slate-200" />
                            </div>
                        </div>
                    ))
                ) : (
                    categories.map((category) => (
                        <Link
                            key={category._id}
                            href={`/category/${category._id}`}
                            className="flex  flex-row items-center gap-4 rounded-3xl bg-slate-100 px-4 py-5 transition duration-200 hover:shadow-md hover:scale-105 cursor-pointer"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm border border-slate-200">
                                {category.icon ? (
                                    <img
                                        src={category.icon}
                                        alt={category.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full rounded-full bg-slate-200" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900">{category.name}</p>
                                <p className="mt-1 text-xs text-slate-500">{products.length} sản phẩm</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
}
