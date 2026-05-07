import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-background py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-center items-center py-12">
                            <div className="text-gray-600">Đang tải sản phẩm...</div>
                        </div>
                    </div>
                </div>
            }
        >
            <ProductsClient />
        </Suspense>
    );
}
