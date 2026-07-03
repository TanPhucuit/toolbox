import { describe, expect, it } from "vitest";
import { slugify } from "./slug";

describe("slugify", () => {
  it("normalizes Vietnamese text", () => {
    expect(slugify("Công cụ xử lý PDF & tài liệu")).toBe("cong-cu-xu-ly-pdf-tai-lieu");
  });

  it("removes duplicate separators", () => {
    expect(slugify("  Batch   Image Studio!! ")).toBe("batch-image-studio");
  });
});
