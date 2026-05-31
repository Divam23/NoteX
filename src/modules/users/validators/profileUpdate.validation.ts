import { z } from 'zod';

export const userProfileUpdateValidationSchema = z.object({
  firstName: z.string().min(2).max(100).trim().optional(),

  lastName: z.string().min(2).max(100).trim().optional(),

  userName: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, "must be atleast 5 characters")
    .max(30, "max 30 characters")
    .regex(/^(?![._-])(?!.*[._-]{2})(?!.*[._-]$)[a-z0-9._-]{5,30}$/)
    .refine((s) => !/^\d+$/.test(s), 'Username cannot contain only numbers')
    .optional(),

  bio: z.string().min(10).max(300).trim().optional(),
  college: z.string().trim().max(100).optional(),
  course: z.string().trim().max(100).optional(),
  subjects: z.string().trim().max(100).optional(),
  university: z.string().trim().max(100).optional(),
  semester: z.number().min(1).max(8).optional(),
});
