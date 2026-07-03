import { describe, expect, it } from "vitest";
import { formatPrice, formatVnd } from "./format";

describe("format helpers", () => {
  it("formats Vietnamese dong", () => {
    expect(formatVnd(599000)).toContain("599.000");
    expect(formatVnd(599000)).toContain("₫");
  });

  it("maps price types", () => {
    expect(formatPrice("contact")).toBe("Liên hệ báo giá");
    expect(formatPrice("free")).toBe("Miễn phí");
    expect(formatPrice("fixed", 499000)).toContain("499.000");
    expect(formatPrice("fixed", 1, "Theo dự án")).toBe("Theo dự án");
  });
});
