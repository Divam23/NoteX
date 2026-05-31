import mongoose, { Document } from 'mongoose';

import { BookmarkEntityType } from '../constants/bookmarkEntityType.constant';

export interface IBookmark extends Document {
    user: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    targetType: BookmarkEntityType;
    createdAt: Date;
    updatedAt: Date;
}