export default function Footer() {
    return (
        <footer className="bg-black text-white mt-10">
            <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo / giới thiệu */}
                <div>
                    <h1 className="text-2xl font-bold mb-3">
                        Fashion Shop 🛍️
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Shop quần áo thời trang nam nữ chất lượng cao, giá tốt, giao hàng toàn quốc.
                    </p>
                </div>

                {/* Liên kết */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Liên kết</h2>
                    <ul className="space-y-2 text-gray-400">
                        <li className="hover:text-white cursor-pointer">Trang chủ</li>
                        <li className="hover:text-white cursor-pointer">Sản phẩm</li>
                        <li className="hover:text-white cursor-pointer">Nam</li>
                        <li className="hover:text-white cursor-pointer">Nữ</li>
                    </ul>
                </div>

                {/* Liên hệ */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Liên hệ</h2>
                    <p className="text-gray-400 text-sm">📍 Bình Dương, Việt Nam</p>
                    <p className="text-gray-400 text-sm">📞 0123 456 789</p>
                    <p className="text-gray-400 text-sm">✉️ support@shop.com</p>
                </div>

            </div>

            {/* bottom */}
            <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
                © 2026 Fashion Shop. All rights reserved.
            </div>
        </footer>
    )
}