import { z } from 'zod';
import mongoose from 'mongoose';

// Custom Zod type for MongoDB ObjectId
const objectIdSchema = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId'
  });

// Base user schema (for creation)
export const createUserSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  profilePicture: z.string().url('Invalid URL').nullable().optional(),
  currentWorkSpace: objectIdSchema.nullable().optional(),
  isActive: z.boolean().default(true),
  lastLogin: z.date().nullable().optional()
});

// Schema for user login
export const loginUserSchema = createUserSchema.pick({
  email: true,
  password: true
});
