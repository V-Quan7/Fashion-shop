import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    return (
        <Link href={`/products/${product._id}`} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="relative overflow-hidden bg-slate-100">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="h-80 bg-slate-200" />
                )}

                <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-amber-600 shadow-sm">
                    -47%
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="space-y-3">
                    <h3 className="text-base font-semibold text-slate-900 line-clamp-2">
                        {product.name}
                    </h3>

                    <div>
                        <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                            Rẻ Vô Địch
                        </span>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between gap-4 text-slate-900">
                        <span className="text-lg font-bold">
                            {Number(product.price).toLocaleString("vi-VN")}₫
                        </span>
                        <span className="text-sm text-slate-500">Đã bán 2k+</span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // TODO: Add to cart functionality
                            console.log("Add to cart:", product._id);
                        }}
                        className="mt-5 w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition duration-200 hover:bg-amber-600 active:scale-95"
                    >
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </Link>
    );
}