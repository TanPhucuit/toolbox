"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="container-shell py-16">
      <div className="stitch-card p-10 text-center">
        <h1 className="text-2xl font-bold">Không tải được dữ liệu</h1>
        <p className="mt-2 text-on-surface-variant">Vui lòng kiểm tra cấu hình Supabase hoặc thử lại.</p>
        <button className="mt-6 rounded-lg bg-primary px-5 py-3 font-semibold text-white" onClick={reset}>
          Tải lại
        </button>
      </div>
    </main>
  );
}
