import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { AppError } from './index.js';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
      details: error.details || null
    });
  }
  console.log('unhandled Error: ', error);
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    details: null
  });
};
