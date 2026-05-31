import { objectIdValidationSchema } from "@/shared/validators/objectIdValidation.validator";
import {z} from "zod";

export const getCommentsSchema = z.object({
    params: z.object({
        noteId: objectIdValidationSchema,
    }),

    query: z.object({
        page: z.coerce.number().min(1).default(1),

        limit: z.coerce.number()
            .min(1)
            .max(50)
            .default(10),
    }),
});