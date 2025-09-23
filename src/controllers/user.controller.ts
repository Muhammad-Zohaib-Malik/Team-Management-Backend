import { NextFunction, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { UnauthorizedError } from '../middlewares/error-handler/index.js';
import status from 'http-status';

export const getCurrentUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedError('User is not authenticated');
    }
    res.status(status.OK).json({
      user
    });
  } catch (error) {
    next(error);
  }
};
