import { describe, expect, it } from "vitest";
import { AdminAccessError } from "./errors";

describe("AdminAccessError", () => {
  it("keeps a safe access denied message", () => {
    const error = new AdminAccessError();
    expect(error.message).toBe("Không có quyền truy cập");
    expect(error.name).toBe("AdminAccessError");
  });
});
