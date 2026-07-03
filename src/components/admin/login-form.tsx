"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/lib/admin/actions";

const initialState = { ok: false, message: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);
  return (
    <form action={formAction} className="stitch-card mx-auto max-w-md space-y-5 p-8">
      <div>
        <h1 className="text-2xl font-bold">Đăng nhập admin</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Chỉ tài khoản có trong bảng admin_users mới được truy cập.
        </p>
      </div>
      <label className="block">
        <span className="admin-label">Tên đăng nhập hoặc email</span>
        <input
          className="admin-input"
          name="email"
          type="text"
          autoComplete="username"
          placeholder="admin123"
          required
        />
      </label>
      <label className="block">
        <span className="admin-label">Mật khẩu</span>
        <input className="admin-input" name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.message ? <p className="rounded-lg bg-red-50 p-3 text-sm text-error">{state.message}</p> : null}
      <button disabled={pending} className="min-h-11 w-full rounded-lg bg-primary px-5 py-3 font-semibold text-white disabled:opacity-60">
        {pending ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
