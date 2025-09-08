import { Request, Response, NextFunction } from 'express';
import { createUserSchema } from '../validation/auth.validation.js';
import status from 'http-status';
import { registerService } from '../services/auth.service.js';
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
