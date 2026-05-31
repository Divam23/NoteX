import { Router } from "express";
import { uploadNote } from "@/modules/notes/controllers/uploadNote.controller";
import { validate } from "@/shared/middlewares/validate.middleware";
import { verifyFirebaseToken } from "@/shared/middlewares/verifyFirebaseToken.middleware";
import { noteUpload } from "@/shared/middlewares/multer.middleware";
import { createNoteSchema } from "./validators/createNote.validators";
import { getSingleNoteController } from "./controllers/getSingleNote.controller";
import { getNoteListController } from "./controllers/getListOfNotes.controller";
import { deleteNoteSchema } from "./validators/deleteNote.validators";
import { deleteSingleNoteController } from "./controllers/deleteSingleNote.controller";
import { getNoteIdSchema } from "./validators/getNoteIdSchema.validator";
import { updateSingleNoteController } from "./controllers/updateSingleNote.controller";
import { updateNoteSchema } from "./validators/updateNote.validatiors";
import { getCommentsSchema } from "../comments/validators/getComments.validation";
import { getAllTopLevelCommentsController } from "../comments/controllers/getComments.controller";
import { createCommentSchema } from "../comments/validators/createComment.validation";
import { createCommentController } from "../comments/controllers/createComment.controller";
import { objectIdValidationSchema } from "@/shared/validators/objectIdValidation.validator";
import { toggleNoteLikeController } from "../likes/controllers/toggleNoteLike.controller";

const router = Router();

//PUBLIC ROUTES
router.route("/feed").get(getNoteListController)
//Comment route
router.route("/:noteId/comments").get(validate(getCommentsSchema), getAllTopLevelCommentsController)

//PRIVATE ROUTES
router.route("/create").post(verifyFirebaseToken, noteUpload.single("file"), validate(createNoteSchema), uploadNote);
router.route("/:noteId").get(verifyFirebaseToken, validate(getNoteIdSchema), getSingleNoteController)
router.route("/delete/:noteId").delete(verifyFirebaseToken, validate(deleteNoteSchema), deleteSingleNoteController)
router.route("/:noteId").patch(verifyFirebaseToken, validate(getNoteIdSchema), validate(updateNoteSchema), updateSingleNoteController)
//Comment route
router.route("/:noteId/comments").post(verifyFirebaseToken, validate(createCommentSchema), createCommentController);
router.route('/:noteId/like').post(verifyFirebaseToken, validate(objectIdValidationSchema), toggleNoteLikeController)


export default router;