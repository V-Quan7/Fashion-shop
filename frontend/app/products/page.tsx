'use client';

import { useEffect, useState } from "react";

const API = "http://localhost:5001/api";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${API}/product`);
            const data = await res.json();

            console.log("DATA:", data); // 👈 DEBUG
            setProducts(data.data || []);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Danh sách sản phẩm</h1>

            {products.length === 0 && <p>Không có sản phẩm</p>}

            {products.map((p) => (
                <div key={p._id}>{p.name}</div>
            ))}
        </div>
    );
}