import { objectIdValidationSchema } from "@/shared/validators/objectIdValidation.validator";
import {z} from "zod";

export const updateCommentSchema = z.object({
    params:z.object({
        commentId: objectIdValidationSchema
    }),
    body: z.object({
        content:z.string().trim().min(1).max(1000),
    }),

})

export type UpdateCommentDto = z.infer<typeof updateCommentSchema>;