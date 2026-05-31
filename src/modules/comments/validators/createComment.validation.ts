import { objectIdValidationSchema } from "@/shared/validators/objectIdValidation.validator";
import {z} from "zod";

export const createCommentSchema = z.object({
    params:z.object({
        noteId: objectIdValidationSchema
    }),
    body: z.object({
        content:z.string().trim().min(1).max(1000),
        parentComment:objectIdValidationSchema.nullable().optional()
    }),

})