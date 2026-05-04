import React from 'react';

const PromoBanner = () => {
  return (
    <section className="mt-10 grid gap-5 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-4xl bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Sale up to</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">50% OFF</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Cho tất cả sản phẩm hè. Săn ngay ưu đãi độc quyền với thiết kế mới nhất.
            </p>
          </div>

          <button className="inline-flex w-max items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800">
            Mua ngay
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-4xl bg-slate-950 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
        <div className="absolute left-0 bottom-0 h-32 w-32 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-6 text-white">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">New Collection</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-tight">Summer 2024</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              Khám phá ngay bộ sưu tập mới nhất với phong cách nhẹ nhàng và sang trọng.
            </p>
          </div>

          <button className="inline-flex w-max items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-white/15">
            Khám phá
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
