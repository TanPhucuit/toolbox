import { describe, expect, it } from "vitest";
import { inquirySchema } from "./inquiry";
import { serviceSchema } from "./service";
import { toolSchema } from "./tool";

describe("validation", () => {
  it("accepts a valid inquiry", () => {
    const result = inquirySchema.safeParse({
      inquiry_type: "tool",
      full_name: "Nguyễn Văn A",
      phone: "0900000000",
      email: "a@example.com",
      message: "Tôi cần tư vấn triển khai tool xử lý dữ liệu.",
      form_started_at: Date.now() - 5000
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid inquiry email", () => {
    const result = inquirySchema.safeParse({
      full_name: "Nguyễn Văn A",
      phone: "0900000000",
      email: "bad-email",
      message: "Tôi cần tư vấn triển khai tool xử lý dữ liệu.",
      form_started_at: Date.now()
    });
    expect(result.success).toBe(false);
  });

  it("validates external URL fields in tool schema", () => {
    const result = toolSchema.safeParse({
      name: "Tool Test",
      slug: "tool-test",
      short_description: "Một mô tả đủ dài cho tool test.",
      price_type: "fixed",
      price_vnd: 100000,
      old_price_vnd: null,
      category_id: null,
      primary_cta_type: "external",
      primary_cta_url: "https://example.com",
      icon_url: "",
      cover_image_url: "",
      tutorial_video_url: "",
      demo_url: "",
      compatibility: "Windows 11",
      language_support: "Tiếng Việt",
      features: "Tính năng A",
      system_requirements: "RAM 4GB",
      changelog: "",
      faq: "",
      is_featured: false,
      is_published: true,
      sort_order: 1
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid service slug", () => {
    const result = serviceSchema.safeParse({
      title: "Dịch vụ",
      slug: "Sai Slug",
      short_description: "Mô tả dịch vụ đủ dài để hợp lệ.",
      cover_image_url: "",
      features: "",
      process_steps: "",
      faq: "",
      price_label: "Liên hệ báo giá",
      primary_cta_label: "Yêu cầu tư vấn",
      is_featured: false,
      is_published: true,
      sort_order: 0
    });
    expect(result.success).toBe(false);
  });
});
