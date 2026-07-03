"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime"
];
const maxSize = 50 * 1024 * 1024;

export function StorageUpload() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type) || file.size > maxSize) {
      setMessage("Chỉ upload PNG, JPG, WebP, MP4, WebM hoặc MOV tối đa 50MB.");
      return;
    }
    setMessage("Đang upload...");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const folder = file.type.startsWith("video/") ? "videos" : "images";
    const path = `admin/${folder}/${crypto.randomUUID()}-${safeName}`;
    const supabase = createClient();
    const { error } = await supabase.storage.from("site-assets").upload(path, file, {
      cacheControl: "3600",
      upsert: false
    });
    if (error) {
      setMessage("Upload thất bại. Kiểm tra quyền admin và Storage RLS.");
      return;
    }
    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    setUrl(data.publicUrl);
    setMessage("Upload thành công. Dùng URL bên dưới cho logo, cover, video hoặc ảnh hướng dẫn.");
  }

  return (
    <div className="stitch-card mb-6 p-5">
      <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-2 text-sm font-semibold text-primary">
        <Upload className="h-4 w-4" />
        Upload ảnh/video site-assets
        <input
          className="sr-only"
          type="file"
          accept="image/png,image/jpeg,image/webp,video/mp4,video/webm,video/quicktime"
          onChange={onChange}
        />
      </label>
      {message ? <p className="mt-3 text-sm text-on-surface-variant">{message}</p> : null}
      {url ? <input className="admin-input mt-3 font-mono text-xs" readOnly value={url} onFocus={(event) => event.currentTarget.select()} /> : null}
    </div>
  );
}
