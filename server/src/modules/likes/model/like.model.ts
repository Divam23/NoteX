import mongoose, { Schema } from 'mongoose';

const LikeSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        note: {
            type: mongoose.Types.ObjectId,
            ref: 'Note',
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
        note: 1,
    },
    { 
        unique: true 
    }
);

const Like = mongoose.model("Like", LikeSchema);

export default Like;
