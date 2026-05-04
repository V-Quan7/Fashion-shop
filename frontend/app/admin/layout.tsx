"use client"
import Link from "next/link"


export default function AdminLayout({ children }: any) {
    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <div className="w- bg-gray-900 text-white p-5">
                <Link href="/admin"> <h2 className="text-xl font-bold mb-6">ADMIN</h2> </Link>

                <ul className="space-y-4">
                    <li>
                        <Link href="/admin/category">Category</Link>
                    </li>
                    <li>
                        <Link href="/admin/subcategory">SubCategory</Link>
                    </li>
                    <li>
                        <Link href="/admin/products">Products</Link>
                    </li>
                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 bg-gray-100">
                {children}
            </div>
        </div>
    )
}