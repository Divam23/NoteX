import {z} from "zod";
import { objectIdValidationSchema } from "@/shared/validators/objectIdValidation.validator";

export const deleteNoteSchema = z.object({
    params: z.object({
        noteId: objectIdValidationSchema
    })
})