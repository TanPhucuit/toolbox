"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Clipboard, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const allowedTypes = ["image/png", "image/jpeg", "image/webp", "video/mp4", "video/webm", "video/quicktime"];
const maxSize = 50 * 1024 * 1024;

export function StorageUpload() {
  const [urls, setUrls] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState("");

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = [...(event.target.files ?? [])];
    if (!files.length) return;
    if (files.some((file) => !allowedTypes.includes(file.type) || file.size > maxSize)) {
      setMessage("Mỗi file phải là PNG, JPG, WebP, MP4, WebM hoặc MOV và không vượt quá 50MB.");
      return;
    }
    setMessage(`Đang upload ${files.length} file...`);
    const supabase = createClient();
    const uploaded: string[] = [];
    for (const file of files) {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
      const folder = file.type.startsWith("video/") ? "videos" : "images";
      const path = `admin/${folder}/${crypto.randomUUID()}-${safeName}`;
      const { error } = await supabase.storage.from("site-assets").upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) {
        setMessage(`Đã upload ${uploaded.length}/${files.length} file. File còn lại thất bại; kiểm tra quyền Storage.`);
        setUrls((current) => [...uploaded, ...current]);
        return;
      }
      uploaded.push(supabase.storage.from("site-assets").getPublicUrl(path).data.publicUrl);
    }
    setUrls((current) => [...uploaded, ...current]);
    setMessage(`Đã upload ${uploaded.length} file. Copy URL để dán vào cover hoặc gallery.`);
    event.target.value = "";
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    window.setTimeout(() => setCopied(""), 1500);
  }

  async function copyAll() {
    if (!urls.length) return;
    await navigator.clipboard.writeText(urls.join("\n"));
    setMessage("Đã copy toàn bộ URL theo từng dòng — có thể dán thẳng vào ô Gallery.");
  }

  return (
    <div className="rounded-xl border border-outline-variant bg-white p-4 md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold">Upload ảnh/video vào Supabase</p>
          <p className="mt-1 text-sm text-on-surface-variant">Chọn nhiều file cùng lúc. Sau khi upload, copy một URL làm cover hoặc copy tất cả cho gallery.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {urls.length ? <button type="button" onClick={copyAll} className="admin-action-button"><Clipboard className="h-4 w-4" />Copy tất cả</button> : null}
          <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
            <Upload className="h-4 w-4" />Chọn file
            <input className="sr-only" multiple type="file" accept="image/png,image/jpeg,image/webp,video/mp4,video/webm,video/quicktime" onChange={onChange} />
          </label>
        </div>
      </div>
      {message ? <p className="mt-3 text-sm text-on-surface-variant">{message}</p> : null}
      {urls.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {urls.map((url) => {
            const video = /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
            return (
              <div key={url} className="overflow-hidden rounded-lg border border-outline-variant">
                <div className="relative aspect-video bg-surface-container">
                  {video ? <video src={url} className="h-full w-full object-cover" /> : <Image src={url} alt="" fill unoptimized className="object-cover" />}
                </div>
                <button type="button" onClick={() => copyUrl(url)} className="flex min-h-10 w-full items-center justify-center gap-2 px-3 text-xs font-semibold text-primary">
                  {copied === url ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  {copied === url ? "Đã copy" : "Copy URL"}
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
