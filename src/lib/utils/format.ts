import type { PriceType } from "@/types/database.types";

export function formatVnd(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPrice(
  priceType: PriceType,
  priceVnd?: number | null,
  priceLabel?: string | null
) {
  if (priceLabel) return priceLabel;
  if (priceType === "free") return "Miễn phí";
  if (priceType === "contact") return "Liên hệ báo giá";
  return typeof priceVnd === "number" ? formatVnd(priceVnd) : "Liên hệ báo giá";
}

export function toDateTime(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
