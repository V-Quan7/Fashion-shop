'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
const API = "http://localhost:5001/api";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searcheword, setSearcheword] = useState("")
  const handleSearch = () => {
    if (searcheword.trim() !== "") {
      window.location.href = `/products?search=${encodeURIComponent(searcheword)}`;
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
  // 🔥 FETCH API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCat = await fetch(`${API}/category`);
        const resSub = await fetch(`${API}/subcategory`);

        const catJson = await resCat.json();
        const subJson = await resSub.json();

        setCategories(catJson.data || []);
        setSubcategories(subJson.data || []);
      } catch (error) {
        console.error("Lỗi fetch API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

      {/* Banner */}
      <div className="bg-black text-white text-center text-sm py-2">
        🎉 Miễn phí ship đơn trên 500k
      </div>

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <a href="/" className="text-2xl font-bold tracking-wide">
            LoGo
          </a>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-8 text-gray-600">

            <a href="#" className="hover:text-black transition">Home</a>

            {/* 🔥 DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("product")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 font-medium hover:text-black transition">
                Sản phẩm <ChevronDown size={16} />
              </button>

              {activeDropdown === "product" && (
                <div className="absolute left-0 top-full pt-2 z-50">

                  <div className="w-[650px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6">

                    <div className="grid grid-cols-3 gap-8">

                      {!loading && categories.map((cat) => (
                        <div key={cat._id}>

                          <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">
                            {cat.name}
                          </h3>

                          <ul className="space-y-2">
                            {subcategories
                              .filter(
                                (sub) =>
                                  String(sub.categoryId) === String(cat._id) ||
                                  String(sub.categoryId?._id) === String(cat._id)
                              )
                              .map((sub) => (
                                <li key={sub._id}>
                                  <a
                                    href={`/products?category=${cat._id}&sub=${sub._id}`}
                                    className="text-gray-500 hover:text-orange-500 text-sm transition flex items-center gap-2 group"
                                  >
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition" />
                                    {sub.name}
                                  </a>
                                </li>
                              ))}
                          </ul>

                        </div>
                      ))}

                    </div>

                  </div>

                </div>
              )}
            </div>

            <a href="#" className="hover:text-black transition">Về chúng tôi</a>
            <a href="#" className="hover:text-black transition">Liên hệ</a>

          </div>

          {/* RIGHT ICON */}
          <div className="flex items-center gap-5 text-gray-600">
            {/* /* 🔥 SEARCH */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searcheword}
                onChange={(e) => setSearcheword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Search
              size={18}
              onClick ={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition"
              />
            </div>
            {/* user */}
            <User className="cursor-pointer hover:text-black transition" />
            <ShoppingCart className="cursor-pointer hover:text-black transition" />

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>
      </div>

      {/* 🔥 MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg p-4">

          {!loading && categories.map((cat) => (
            <div key={cat._id} className="mb-4">

              <h3 className="font-semibold text-black mb-2">
                {cat.name}
              </h3>

              <div className="pl-3 border-l space-y-2">
                {subcategories
                  .filter(
                    (sub) =>
                      String(sub.categoryId) === String(cat._id) ||
                      String(sub.categoryId?._id) === String(cat._id)
                  )
                  .map((sub) => (
                    <a
                      key={sub._id}
                      href={`/products?category=${cat._id}&sub=${sub._id}`}
                      className="block text-gray-500 text-sm hover:text-black transition"
                    >
                      {sub.name}
                    </a>
                  ))}
              </div>

            </div>
          ))}

        </div>
      )}
    </nav>
  );
};

export default Navbar;