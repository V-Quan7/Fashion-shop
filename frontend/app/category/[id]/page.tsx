"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Category, Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

const API = "http://localhost:5001/api";

export default function CategoryPage() {
    const params = useParams();
    const id = params.id as string;

    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch category by ID
                const catRes = await fetch(`${API}/category`);
                const catData = await catRes.json();
                const categories: Category[] = catData.data || [];
                const foundCategory = categories.find((c) => c._id === id);

                if (!foundCategory) {
                    setLoading(false);
                    return;
                }

                setCategory(foundCategory);

                // Fetch products by categoryId
                const prodRes = await fetch(`${API}/products?categoryId=${id}`);
                const prodData = await prodRes.json();
                setProducts(prodData.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-12 bg-gray-200 rounded-lg mb-8"></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-lg p-4 shadow">
                                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-background p-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Category not found</h1>
                    <p className="text-gray-600">The category you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{category.name} {products.length} Sản phẩm</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Category Header */}
                {/* <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
                    <p className="text-gray-600">Showing {products.length} products</p>
                </div> */}
                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
