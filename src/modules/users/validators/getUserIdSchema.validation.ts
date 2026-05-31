import {z} from "zod";
import { objectIdValidationSchema } from "@/shared/validators/objectIdValidation.validator";

export const getUserIdSchema = z.object({
    params: z.object({
        userId: objectIdValidationSchema
    })
})