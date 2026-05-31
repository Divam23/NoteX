import Comment from "../model/comment.model";
import User from "@/modules/users/models/users.model";
import Note from "@/modules/notes/notes.model";
import { ApiError } from "@/shared/utils/ApiError";

export const deleteComment = async({firebaseUid, commentId}:{firebaseUid:string, commentId:string})=>{
    const user= await User.findOne({firebaseUid}).lean();
    if(!user) throw new ApiError(404, "User not found");

    const comment = await Comment.findById(commentId);
    if(!comment) throw new ApiError(404, "Comment not found");

    if (comment.user.toString() !== user._id.toString()) {
        throw new ApiError(403, 'You can only delete your own comments');
    }

    if(comment.moderation?.isDeleted){
        throw new ApiError(400, "Cannot delete deleted comment");
    }

    comment.moderation.isDeleted = true;
    comment.moderation.deletedBy = user._id;
    comment.moderation.deletedAt = new Date();
    await comment.save();

    const updatePromises: Promise<any>[] = [
        Note.findByIdAndUpdate(comment.note._id, {
            $inc: {
                'stats.commentsCount': -1,
            },
        }).exec(),
    ];
    
    
    if (comment.parentComment) {
        updatePromises.push(
            Comment.findByIdAndUpdate(comment.parentComment, {
                $inc: { 'stats.repliesCount': -1 },
            }).exec()
        );
    }
    await Promise.all(updatePromises);

    return {success:true};

}