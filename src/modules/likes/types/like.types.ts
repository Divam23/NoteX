import mongoose, { Document } from 'mongoose';

import { EntityType } from '../constants/entityType.constant';

export interface ILike extends Document {
    user: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    targetType: EntityType;
    createdAt: Date;
    updatedAt: Date;
}
