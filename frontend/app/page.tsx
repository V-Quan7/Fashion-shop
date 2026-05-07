"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../services/api.js";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product.js";
import HeroBanner from "@/components/banner/HeroBanner";
import CategoryIcon from "@/components/categoryicon/CategoryIcon";
import PromoBanner from "@/components/banner/PromoBanner";
import Link from "next/link";

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
    <main className="min-h-screen bg-background text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <HeroBanner />

        <div className="mt-8">
          <CategoryIcon />
        </div>

        <section className="mt-12 rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
                Bộ sưu tập mới
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Sản phẩm nổi bật
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Những mẫu thời trang mới nhất dành cho bạn.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Xem tất cả
            </Link>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50"
                >
                  <div className="aspect-[3/4] bg-slate-200" />

                  <div className="p-3">
                    <div className="h-4 w-3/4 rounded-full bg-slate-200" />

                    <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200" />

                    <div className="mt-4 h-9 rounded-full bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {products.map((item) => (
                <Link
                  href={`/products/${item._id}`}
                  key={item._id}
                  className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-amber-500 shadow">
                      -47%
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="line-clamp-2 min-h-[42px] text-sm font-semibold leading-5 text-slate-800">
                      {item.name}
                    </h3>

                    <div className="mt-2 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
                      Rẻ Vô Địch
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-base font-bold text-slate-900">
                          {item.price?.toLocaleString()}₫
                        </p>
                      </div>

                      <p className="text-[11px] leading-4 text-slate-400">
                        Đã bán
                        <br />
                        2k+
                      </p>
                    </div>

                    <button className="mt-4 w-full rounded-full bg-amber-500 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-amber-600">
                      Thêm vào giỏ
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-semibold text-slate-900">
                Chưa có sản phẩm
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Vui lòng thử lại sau
              </p>
            </div>
          )}
        </section>

        <PromoBanner />
      </div>
    </main>
  );
}