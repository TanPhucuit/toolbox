"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inquirySchema,
  type InquiryFormValues,
  type InquiryInput
} from "@/lib/validation/inquiry";

type Props = {
  inquiryType?: InquiryInput["inquiry_type"];
  toolId?: string | null;
  serviceId?: string | null;
  sourcePage?: string;
};

export function InquiryForm({ inquiryType = "general", toolId, serviceId, sourcePage }: Props) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<InquiryFormValues, unknown, InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      inquiry_type: inquiryType,
      tool_id: toolId ?? null,
      service_id: serviceId ?? null,
      source_page: sourcePage,
      form_started_at: 1
    }
  });

  useEffect(() => {
    setValue("form_started_at", Date.now());
  }, [setValue]);

  async function onSubmit(values: InquiryInput) {
    setStatus("idle");
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    if (!response.ok) {
      setStatus("error");
      return;
    }
    reset({
      inquiry_type: inquiryType,
      tool_id: toolId ?? null,
      service_id: serviceId ?? null,
      source_page: sourcePage,
      form_started_at: 1
    });
    setStatus("success");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="hidden" {...register("inquiry_type")} />
      <input type="hidden" {...register("tool_id")} />
      <input type="hidden" {...register("service_id")} />
      <input type="hidden" {...register("source_page")} />
      <input type="hidden" {...register("form_started_at", { valueAsNumber: true })} />
      <input className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />
      <Field label="Họ và tên *" error={errors.full_name?.message}>
        <input className="admin-input" {...register("full_name")} autoComplete="name" />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Số điện thoại *" error={errors.phone?.message}>
          <input className="admin-input" {...register("phone")} autoComplete="tel" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input className="admin-input" type="email" {...register("email")} autoComplete="email" />
        </Field>
      </div>
      <Field label="Công ty / Zalo" error={errors.company?.message}>
        <input className="admin-input" {...register("company")} />
      </Field>
      <Field label="Nội dung cần tư vấn *" error={errors.message?.message}>
        <textarea className="admin-input min-h-32 resize-y" {...register("message")} />
      </Field>
      {status === "success" ? (
        <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          Đã gửi yêu cầu. Chúng tôi sẽ liên hệ lại sớm.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Chưa gửi được yêu cầu. Vui lòng kiểm tra thông tin hoặc thử lại sau.
        </p>
      ) : null}
      <button
        disabled={isSubmitting}
        data-event="inquiry_click"
        className="min-h-11 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-container disabled:opacity-60"
      >
        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-sm text-error">{error}</span> : null}
    </label>
  );
}
