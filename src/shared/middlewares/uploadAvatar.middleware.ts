import multer from 'multer';
import { Request } from 'express';
import { ApiError } from '../utils/ApiError';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new ApiError(400, 'Only image uploads allowed'));
  }

  cb(null, true);
};

export const avatarUpload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
