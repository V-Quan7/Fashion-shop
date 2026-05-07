'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getProducts } from "@/services/api";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("category") || "";
    const subCategoryId = searchParams.get("sub") || "";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const params: any = {};
                if (search) params.search = search;
                if (categoryId) params.categoryId = categoryId;
                if (subCategoryId) params.subCategoryId = subCategoryId;

                const data = await getProducts(params);

                if (data.success) {
                    setProducts(data.data || []);
                } else {
                    setError("Không thể tải sản phẩm");
                }
            } catch (err) {
                console.error("Lỗi khi tải sản phẩm:", err);
                setError("Lỗi kết nối đến server");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search, categoryId, subCategoryId]);

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    {search && (
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Kết quả tìm kiếm: "<span className="text-blue-600">{search}</span>"
                        </h1>
                    )}
                    {!search && (
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Danh sách sản phẩm
                        </h1>
                    )}
                    <p className="text-gray-600">
                        Tìm thấy {products.length} sản phẩm
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-gray-600">Đang tải sản phẩm...</div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link
                                key={product._id}
                                href={`/products/${product._id}`}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                            >
                                <div className="aspect-square bg-gray-200 overflow-hidden">
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    {product.brand && (
                                        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            {product.discount > 0 && (
                                                <>
                                                    <span className="text-sm text-gray-500 line-through">
                                                        {product.price.toLocaleString()}đ
                                                    </span>
                                                    <span className="text-red-600 font-bold">
                                                        {(product.price * (1 - product.discount / 100)).toLocaleString()}đ
                                                    </span>
                                                </>
                                            )}
                                            {!product.discount && (
                                                <span className="text-blue-600 font-bold">
                                                    {product.price.toLocaleString()}đ
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                            <p className="text-gray-600 mb-4">
                                {search
                                    ? `Không tìm thấy sản phẩm nào với từ khóa "${search}"`
                                    : "Không có sản phẩm nào"}
                            </p>
                            <Link
                                href="/products"
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                                Xem tất cả sản phẩm
                            </Link>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}