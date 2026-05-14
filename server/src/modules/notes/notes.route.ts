import { Router } from "express";
import { uploadNote } from "./notes.controller";
import { validate } from "@/shared/middlewares/validate.middleware";
import { verifyFirebaseToken } from "@/shared/middlewares/verifyFirebaseToken.middleware";
import { noteUpload } from "@/shared/middlewares/multer.middleware";
import { createNoteSchema } from "./validators/createNote.schema";

const router = Router();

router.route("/create").post(verifyFirebaseToken, noteUpload.single("file"), validate(createNoteSchema), uploadNote);

export default router;