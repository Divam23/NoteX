import {z} from "zod";
import { objectIdValidationSchema } from "@/shared/validators/objectIdValidation.validator";

export const getNoteIdSchema = z.object({
    params:z.object({
        noteId: objectIdValidationSchema
    })
})