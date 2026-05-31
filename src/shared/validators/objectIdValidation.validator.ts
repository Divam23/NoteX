import mongoose from 'mongoose';
import {z} from 'zod';

export const objectIdValidationSchema = z.string().refine(
    (value) => mongoose.Types.ObjectId.isValid(value),

    {
        message: 'Invalid ObjectId',
    }
);
