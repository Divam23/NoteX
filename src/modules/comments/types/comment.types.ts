import mongoose, { Document } from 'mongoose';

export interface IComment extends Document {
    note: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    content: string;
    parentComment: mongoose.Types.ObjectId | null;
    stats: {
        likesCount: number;
        repliesCount: number;
    };
    isEdited: boolean;
    editedAt: Date | null;
    moderation: {
        isDeleted: boolean;
        deletedAt: Date | null;
        deletedBy: mongoose.Types.ObjectId | null;
    };
    createdAt: Date;
    updatedAt: Date;
}
