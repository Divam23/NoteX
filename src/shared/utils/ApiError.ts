class ApiError extends Error{
    public statusCode:number;
    public success:boolean;
    public errors: unknown[];
    public data: unknown | null;

    constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: unknown[] = [],
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.data = null;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };