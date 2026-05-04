"use client";

export default function HeroBanner() {
    return (
        <section className="w-full overflow-hidden rounded-[2rem] bg-gradient-to-r from-amber-50 via-white to-slate-50 p-4 sm:p-6 md:p-8 shadow-xl shadow-slate-200/50">
            <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
                <div className="space-y-6">
                    <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                        New Arrival
                    </span>

                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                    Nâng tầm phong cách <br />để bạn tự tin hơn mỗi ngày mà không lo về giá.”
                    </h1>

                    <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                        Khám phá bộ sưu tập mới nhất với thiết kế hiện đại, chất liệu cao cấp và phom dáng tinh tế cho phong cách lịch lãm.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <button className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800">
                            Mua ngay
                        </button>
                        <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-50">
                            Xem bộ sưu tập
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -right-6 top-0 h-40 w-40 rounded-full bg-amber-200/70 blur-3xl" />
                    <div className="absolute -bottom-6 left-0 h-28 w-28 rounded-full bg-slate-900/10 blur-3xl" />
                    <img
                        src="/banner/banner.png"
                        alt="hero"
                        className="relative rounded-[2rem] h-[450px] w-full object-cover shadow-2xl shadow-slate-200/40"
                    />
                </div>
            </div>
        </section>
    );
}