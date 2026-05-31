import User from '@/modules/users/models/users.model';
import Like from '../model/like.model';
import Note from '@/modules/notes/notes.model';
import { ApiError } from '@/shared/utils/ApiError';
import { EntityType } from '../constants/entityType.constant';
import Comment from '@/modules/comments/model/comment.model';

export const toggleLike = async (firebaseUid: string, targetType: EntityType, targetId: string) => {
    const user = await User.findOne({
        firebaseUid,
    }).lean();

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const toggleExistingLike = async () => {
        const existingLike = await Like.findOne({
            user: user._id,
            targetId,
            targetType,
        }).lean();

        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);

            return false;
        }

        await Like.create({
            user: user._id,
            targetId,
            targetType,
        });

        return true;
    };

    if (targetType === 'Note') {
        const note = await Note.findById(targetId);

        if (!note) {
            throw new ApiError(404, 'Note not found');
        }

        const liked = await toggleExistingLike();

        const updatedNote = await Note.findByIdAndUpdate(
            targetId,
            {
                $inc: {
                    'stats.likesCount': liked ? 1 : -1,
                },
            },
            {
                new: true,
            }
        ).lean();

        return {
            liked,
            likesCount: updatedNote?.stats?.likesCount || 0,
        };
    }


    if (targetType === 'Comment') {

        const comment =
            await Comment.findById(
                targetId
            );

        if (!comment) {
            throw new ApiError(
                404,
                'Comment not found'
            );
        }
        if(comment.moderation?.isDeleted) throw new ApiError(400, "Cannot like deleted")

        const liked =
            await toggleExistingLike();

        const updatedComment =
            await Comment.findByIdAndUpdate(
                targetId,
                {
                    $inc: {
                        'stats.likesCount':
                            liked ? 1 : -1,
                    },
                },
                {
                    new: true,
                }
            ).lean();

        return {
            liked,
            likesCount:
                updatedComment?.stats
                    ?.likesCount || 0,
        };
    }

    throw new ApiError(400, 'Invalid target type');
};
