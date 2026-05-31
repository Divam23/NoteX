import mongoose, { Schema } from 'mongoose';
import { ILike } from '../types/like.types';
import { ENTITY_TYPE_ENUM } from '../constants/entityType.constant';

const LikeSchema = new Schema<ILike>(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        targetId: {
            type: Schema.Types.ObjectId,

            required: true,
        },

        targetType: {
            type: String,

            enum: ENTITY_TYPE_ENUM,

            required: true,
        },
    },
    {
        timestamps: true,
    }
);

LikeSchema.index(
    {
        user: 1,
        targetId: 1,
        targetType: 1,
    },
    {
        unique: true,
    }
);

const Like = mongoose.model('Like', LikeSchema);

export default Like;
