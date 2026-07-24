"use client";

import { useState } from "react";
import { ExternalLink, Monitor, RefreshCw, Smartphone } from "lucide-react";

type PreviewRoute = { label: string; path: string };

export function SitePreview({ routes }: { routes: PreviewRoute[] }) {
  const [path, setPath] = useState("/");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-white p-4 lg:flex-row lg:items-center">
        <label className="flex-1">
          <span className="admin-label">Trang cần preview</span>
          <select className="admin-input" value={path} onChange={(event) => setPath(event.target.value)}>
            {routes.map((route) => <option key={route.path} value={route.path}>{route.label} — {route.path}</option>)}
          </select>
        </label>
        <div className="flex flex-wrap gap-2 lg:pt-6">
          <button type="button" onClick={() => setViewport("desktop")} className={`admin-action-button ${viewport === "desktop" ? "border-primary text-primary" : ""}`}><Monitor className="h-4 w-4" />Desktop</button>
          <button type="button" onClick={() => setViewport("mobile")} className={`admin-action-button ${viewport === "mobile" ? "border-primary text-primary" : ""}`}><Smartphone className="h-4 w-4" />Mobile</button>
          <button type="button" onClick={() => setReloadKey((key) => key + 1)} className="admin-action-button"><RefreshCw className="h-4 w-4" />Tải lại</button>
          <a href={path} target="_blank" className="admin-action-button"><ExternalLink className="h-4 w-4" />Mở tab mới</a>
        </div>
      </div>
      <div className="overflow-auto rounded-xl border border-outline-variant bg-[#dfe5ef] p-3 md:p-6">
        <div className={`mx-auto overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 ${viewport === "mobile" ? "w-[390px] max-w-full" : "w-full"}`}>
          <iframe key={`${path}-${reloadKey}`} src={path} title={`Preview ${path}`} className="h-[760px] w-full border-0" />
        </div>
      </div>
    </div>
  );
}
