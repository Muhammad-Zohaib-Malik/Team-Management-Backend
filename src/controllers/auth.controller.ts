import { Request, Response, NextFunction } from 'express';
import {
  createUserSchema,
  loginUserSchema
} from '../validation/auth.validation.js';
import status from 'http-status';
import { loginService, registerService } from '../services/auth.service.js';
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { success, data, error } = createUserSchema.safeParse(req.body);
    if (!success) {
      return res
        .status(status.BAD_REQUEST)
        .json({ error: error.flatten().fieldErrors });
    }

    await registerService(data);
    res.status(status.CREATED).json({
      message: 'user created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { success, data, error } = loginUserSchema.safeParse(req.body);
    if (!success) {
      return res
        .status(status.BAD_REQUEST)
        .json({ error: error.flatten().fieldErrors });
    }

    const { user } = await loginService(data);
    res.status(status.OK).json({
      message: 'user logged in successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};
