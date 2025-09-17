import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from './error-handler/index.js';
import { SessionModel } from '../models/session.model.js';
import { UserDocument, UserModel } from '../models/user.model.js';

export interface AuthRequest extends Request {
  user?: UserDocument;
}

export const isAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sid } = req.signedCookies;
    if (!sid) {
      res.clearCookie('sid');
      throw new NotFoundError('Not Logged In');
    }

    const session = await SessionModel.findById(sid);

    if (!session) {
      res.clearCookie('sid');
      throw new NotFoundError('Not Logged In');
    }

    const user = await UserModel.findById(session.userId);
    if (!user) {
      res.clearCookie('sid');
      throw new NotFoundError('User Not Found');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
