import { z } from 'zod';
import { ENTITY_TYPE_ENUM } from '../constants/entityType.constant';
import { objectIdValidationSchema } from '@/shared/validators/objectIdValidation.validator';

export const toggleLikeSchema = z.object({
    params: z.object({
        targetType: z.enum(ENTITY_TYPE_ENUM),

        targetId: objectIdValidationSchema,
    }),
});
