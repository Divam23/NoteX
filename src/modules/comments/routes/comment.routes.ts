import { Router } from 'express';
import { validate } from '@/shared/middlewares/validate.middleware';
import { verifyFirebaseToken } from '@/shared/middlewares/verifyFirebaseToken.middleware';
import { getRepliesSchema } from '../validators/getReplies.validation';
import { getRepliesOnCommentsController } from '../controllers/getReplies.controller';
import { updateCommentSchema } from '../validators/updateComment.validation';
import { deleteCommentController } from '../controllers/deleteComment.controller';
import { updateCommentController } from '../controllers/updateComment.controller';
import { deleteCommentSchema } from '../validators/deleteComment.validation';
import { toggleCommentLikeController } from '@/modules/likes/controllers/toggleCommentLike.controller';

const router = Router();

router.route('/:commentId/replies').get(validate(getRepliesSchema), getRepliesOnCommentsController);
router.route("/:commentId").patch(verifyFirebaseToken, validate(updateCommentSchema), updateCommentController);
router.route("/:commentId").delete(verifyFirebaseToken, validate(deleteCommentSchema), deleteCommentController)
router.route("/:commentId/like").post(verifyFirebaseToken, validate(deleteCommentSchema), toggleCommentLikeController)

export default router;
