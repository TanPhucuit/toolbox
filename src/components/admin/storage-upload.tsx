"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const allowed = ["image/png", "image/jpeg", "image/webp"];

export function StorageUpload() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!allowed.includes(file.type) || file.size > 5 * 1024 * 1024) {
      setMessage("Chỉ upload PNG, JPG hoặc WebP tối đa 5MB.");
      return;
    }
    setMessage("Đang upload...");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const path = `admin/${crypto.randomUUID()}-${safeName}`;
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
    setMessage("Upload thành công. Dùng URL bên dưới cho logo, cover hoặc gallery.");
  }

  return (
    <div className="stitch-card mb-6 p-5">
      <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-2 text-sm font-semibold text-primary">
        <Upload className="h-4 w-4" />
        Upload ảnh site-assets
        <input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" onChange={onChange} />
      </label>
      {message ? <p className="mt-3 text-sm text-on-surface-variant">{message}</p> : null}
      {url ? <input className="admin-input mt-3 font-mono text-xs" readOnly value={url} onFocus={(event) => event.currentTarget.select()} /> : null}
    </div>
  );
}
