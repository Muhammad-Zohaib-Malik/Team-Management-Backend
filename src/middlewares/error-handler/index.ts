import status from 'http-status';
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly success: boolean = false;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number,
    success: boolean,
    details?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource Not Found', details?: unknown) {
    super(message, status.NOT_FOUND, false, details);
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor(message = 'User Already Exists', details?: unknown) {
    super(message, status.CONFLICT, false, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation Error', details?: unknown) {
    super(message, status.BAD_REQUEST, false, details);
  }
}
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details?: unknown) {
    super(message, status.UNAUTHORIZED, false, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', details?: unknown) {
    super(message, status.FORBIDDEN, false, details);
  }
}
export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', details?: unknown) {
    super(message, status.INTERNAL_SERVER_ERROR, false, details);
  }
}
export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details?: unknown) {
    super(message, status.BAD_REQUEST, false, details);
  }
}
