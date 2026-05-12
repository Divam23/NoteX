import { Router } from 'express';
import { userProfileUpdateValidationSchema } from './users.validation';
import { verifyFirebaseToken } from '@/shared/middlewares/verifyFirebaseToken.middleware';
import {
  getCurrentUserPersonalProfile,
  getCurrentUserPublicProfile,
  updateCurrentUserProfile,
} from './users.controller';
import { validate } from '@/shared/middlewares/validate.middleware';

const router = Router();

router.route('/').get(verifyFirebaseToken, getCurrentUserPersonalProfile);
router.route('/:username').get(getCurrentUserPublicProfile);

router.route("/").patch(verifyFirebaseToken, validate(userProfileUpdateValidationSchema), updateCurrentUserProfile)

export default router