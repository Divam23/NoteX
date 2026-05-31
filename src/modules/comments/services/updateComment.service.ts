import Comment from '../model/comment.model';
import User from '@/modules/users/models/users.model';
import { ApiError } from '@/shared/utils/ApiError';
import { UpdateCommentDto } from '../dto/updateComment.dto';

export const updateCommentOrReply = async ({
    firebaseUid,
    commentData,
    commentId,
}: {
    firebaseUid: string;
    commentData: UpdateCommentDto;
    commentId: string;
}) => {
    const user = await User.findOne({ firebaseUid }).lean();
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const comment = await Comment.findById(commentId);
    if (!comment) throw new ApiError(404, 'Comment not found');

    if (comment.user.toString() !== user._id.toString()) {
        throw new ApiError(403, 'You can only edit your own comments');
    }

    if (comment.moderation?.isDeleted) throw new ApiError(400, 'Cannot edit deleted comments');

    comment.content = commentData.content;
    comment.isEdited = true;
    comment.editedAt = new Date();
    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate({
        path:"user",
        select:[
            "firebaseUid",
            "firstName",
            "lastName",
            "userName",
            "verificationStatus",
            "avatar"
        ].join(" ")
    });

    return populatedComment;
};
