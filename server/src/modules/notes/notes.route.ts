import { Router } from "express";
import { uploadNote } from "@/modules/notes/controllers/uploadNote.controller";
import { validate } from "@/shared/middlewares/validate.middleware";
import { verifyFirebaseToken } from "@/shared/middlewares/verifyFirebaseToken.middleware";
import { noteUpload } from "@/shared/middlewares/multer.middleware";
import { createNoteSchema } from "./validators/createNote.schema";
import { getSingleNoteController } from "./controllers/getSingleNote.controller";
import { getNoteListController } from "./controllers/getListOfNotes.controller";

const router = Router();

router.route("/feed").get(getNoteListController)

router.route("/create").post(verifyFirebaseToken, noteUpload.single("file"), validate(createNoteSchema), uploadNote);


router.route("/:id").get(verifyFirebaseToken, getSingleNoteController)


export default router;