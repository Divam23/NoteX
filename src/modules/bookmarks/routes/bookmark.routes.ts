import { Router } from 'express';
import { verifyFirebaseToken } from '@/shared/middlewares/verifyFirebaseToken.middleware';
import { validate } from '@/shared/middlewares/validate.middleware';
import { toggleBookmarkController } from '../controllers/toggleBookmark.controller';
import { toggleBookmarkSchema } from '../validators/toggleBookmark.validation';

const router = Router();

router
    .route('/:targetType/:targetId')
    .post(verifyFirebaseToken, validate(toggleBookmarkSchema), toggleBookmarkController);

export default router;