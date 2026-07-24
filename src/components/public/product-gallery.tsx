"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayCircle } from "lucide-react";

type Media = {
  id: string;
  url: string;
  thumbnail_url: string | null;
  alt_text: string | null;
  media_type: string;
};

export function ProductGallery({ media, productName, badge, verified = true }: { media: Media[]; productName: string; badge?: string | null; verified?: boolean }) {
  const [selected, setSelected] = useState(0);
  const current = media[selected] ?? media[0];

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-outline-variant bg-surface-container shadow-sm">
        {current.media_type === "video" ? (
          <video src={current.url} controls className="h-full w-full object-contain" />
        ) : (
          <Image src={current.url} alt={current.alt_text ?? productName} fill className="object-contain" priority />
        )}
        {badge ? <span className="absolute left-4 top-4 rounded-full bg-error px-3 py-1 text-sm font-bold text-white shadow-sm">{badge}</span> : null}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {verified ? "Ảnh demo thực tế" : "Ảnh trạng thái sản phẩm"}
        </span>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {media.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Xem ảnh ${index + 1}: ${item.alt_text ?? productName}`}
            onClick={() => setSelected(index)}
            className={`relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl border bg-white transition ${
              index === selected ? "border-2 border-primary shadow-md" : "border-outline-variant opacity-75 hover:opacity-100"
            }`}
          >
            {item.media_type === "video" ? (
              <span className="flex h-full items-center justify-center bg-surface-container-high"><PlayCircle className="h-7 w-7 text-primary" /></span>
            ) : (
              <Image src={item.thumbnail_url ?? item.url} alt="" fill className="object-cover" sizes="128px" />
            )}
          </button>
        ))}
      </div>
      <p className="mt-1 text-sm text-on-surface-variant">{current.alt_text}</p>
    </div>
  );
}
