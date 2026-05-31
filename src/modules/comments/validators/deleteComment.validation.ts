import { objectIdValidationSchema } from '@/shared/validators/objectIdValidation.validator';
import { z } from 'zod';

export const deleteCommentSchema = z.object({
    params: z.object({
        commentId: objectIdValidationSchema,
    }),
});
