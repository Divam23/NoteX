import { z } from 'zod';
import { BOOKMARK_ENTITY_TYPE_ENUM } from '../constants/bookmarkEntityType.constant';
import { objectIdValidationSchema } from '@/shared/validators/objectIdValidation.validator';

export const toggleBookmarkSchema = z.object({
    params: z.object({
        targetType: z.enum(BOOKMARK_ENTITY_TYPE_ENUM),

        targetId: objectIdValidationSchema,
    }),
});