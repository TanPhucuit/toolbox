"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ShoppingBag, X } from "lucide-react";
import { InquiryForm } from "@/components/public/inquiry-form";

type ActionMode = "buy" | "consult" | null;

type Props = {
  productName: string;
  priceText: string;
  sourcePage: string;
  toolId?: string | null;
  availabilityNote?: string;
};

export function ProductActions({
  productName,
  priceText,
  sourcePage,
  toolId,
  availabilityNote
}: Props) {
  const [mode, setMode] = useState<ActionMode>(null);

  useEffect(() => {
    if (!mode) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMode(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mode]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setMode("buy")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 font-bold text-white transition hover:bg-primary-container"
        >
          <ShoppingBag className="h-4 w-4" />
          Mua
        </button>
        <button
          type="button"
          onClick={() => setMode("consult")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary bg-white px-5 font-bold text-primary transition hover:bg-primary/5"
        >
          <MessageCircle className="h-4 w-4" />
          Tư vấn
        </button>
      </div>

      {mode ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10131f]/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setMode(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-action-title"
            className={`relative max-h-[92vh] w-full overflow-y-auto rounded-2xl border border-outline-variant bg-white shadow-2xl ${
              mode === "consult" ? "max-w-2xl p-6 md:p-8" : "max-w-lg p-6 md:p-8"
            }`}
          >
            <button
              type="button"
              aria-label="Đóng"
              onClick={() => setMode(null)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            >
              <X className="h-5 w-5" />
            </button>

            {mode === "buy" ? (
              <BuyPanel
                productName={productName}
                priceText={priceText}
                availabilityNote={availabilityNote}
              />
            ) : (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Tư vấn trước khi mua</p>
                <h2 id="product-action-title" className="mt-2 pr-12 text-2xl font-bold md:text-3xl">
                  Bạn cần hỏi thêm về {productName}?
                </h2>
                <p className="mb-6 mt-3 leading-7 text-on-surface-variant">
                  Điền nhu cầu hoặc tình trạng file thực tế. Chúng tôi sẽ liên hệ lại với hướng xử lý phù hợp.
                </p>
                <InquiryForm inquiryType="tool" toolId={toolId} sourcePage={sourcePage} />
              </div>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}

function BuyPanel({
  productName,
  priceText,
  availabilityNote
}: {
  productName: string;
  priceText: string;
  availabilityNote?: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
        {availabilityNote ? "Thông tin sản phẩm" : "Mua sản phẩm"}
      </p>
      <h2 id="product-action-title" className="mt-2 pr-12 text-2xl font-bold md:text-3xl">
        {productName}
      </h2>
      <div className="mt-5 rounded-xl bg-surface-container-low p-5">
        <p className="text-sm text-on-surface-variant">Giá sản phẩm</p>
        <p className="mt-1 text-3xl font-bold text-primary">{priceText}</p>
      </div>

      {availabilityNote ? (
        <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          {availabilityNote}
        </p>
      ) : (
        <p className="mt-5 leading-7 text-on-surface-variant">
          Nhắn Zalo và gửi tên sản phẩm. Chúng tôi sẽ xác nhận phiên bản, hướng dẫn cài đặt và thông tin thanh toán.
        </p>
      )}

      <a
        href="https://zalo.me/0583790873"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#0068ff] px-6 font-bold !text-white transition hover:bg-[#0058dc]"
      >
        <MessageCircle className="h-5 w-5" />
        Nhắn Zalo 0583790873
      </a>
      <p className="mt-3 text-center text-sm text-on-surface-variant">Tài khoản Zalo: toolboxgr</p>
    </div>
  );
}
