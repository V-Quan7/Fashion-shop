"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../services/api.js";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product.js";
import HeroBanner from "@/components/banner/HeroBanner";
import CategoryIcon from "@/components/categoryicon/CategoryIcon";
import PromoBanner from "@/components/banner/PromoBanner";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        console.log("APIFetched products:", res);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <HeroBanner />

        <div className="mt-8">
          <CategoryIcon />
        </div>

        <section className="mt-10 rounded-[2rem] bg-white/90 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">Bộ sưu tập mới</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Sản phẩm nổi bật
              </h2>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800">
              Xem tất cả
            </button>
          </div>

          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="h-72 rounded-[1.5rem] bg-slate-200" />
                  <div className="mt-4 h-4 w-3/4 rounded-full bg-slate-200" />
                  <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200" />
                  <div className="mt-5 h-10 w-full rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-700">
              <p className="text-xl font-semibold">Chưa có sản phẩm để hiển thị</p>
              <p className="mt-3 text-sm text-slate-500">Vui lòng kiểm tra lại dữ liệu hoặc thử lại sau.</p>
            </div>
          )}
        </section>

        <PromoBanner />
      </div>
    </main>
  );
}