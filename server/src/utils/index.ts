export class ResponseUtil<T> {
  constructor() {}
  static success<T>(data: T, message: string) {
    return {
      data,
      message,
      success: true,
    };
  }
  static error(message: string, statusCode: number) {
    return {
      message,
      statusCode,
      success: false,
    };
  }
}
