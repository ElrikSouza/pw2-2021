export class ApiError extends Error {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}
