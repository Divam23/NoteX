class ApiResponse<T = unknown> {
  public statusCode: number;
  public success: boolean;
  public data: T | null;
  public message: string;

  constructor(statusCode: number, data: T | null = null, message = 'Success') {
    ((this.statusCode = statusCode),
      (this.data = data),
      (this.message = message),
      (this.success = statusCode < 400));
  }
}

export { ApiResponse };
