import { ErrorRequestHandler } from 'express';
import status from 'http-status';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`Error occured on PATH: ${req.path}`, error);
  if (error instanceof SyntaxError) {
    return res.status(status.BAD_REQUEST).json({
      message: 'Invalid JSON format'
    });
  }
  return res.status(status.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: 'Unknow error occured'
  });
};
