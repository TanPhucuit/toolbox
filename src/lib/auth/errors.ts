export class AdminAccessError extends Error {
  constructor(message = "Không có quyền truy cập") {
    super(message);
    this.name = "AdminAccessError";
  }
}
