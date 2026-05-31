import Comment from "../model/comment.model";
import { ApiError } from "@/shared/utils/ApiError";

type GetRepliesOptions={
    commentId:string,
    page:number,
    limit:number
}

export const getRepliesOnComments = async({commentId, page, limit}:GetRepliesOptions)=>{
    const filters = {
        parentComment:commentId,
    };
    const skip =  (page-1)*limit;
    
    const parentComment = await Comment.findById(commentId).select("_id moderation.isDeleted").lean();
    if(!parentComment) throw new ApiError(404, "Comment not found");


    const [replies, totalResults] = await Promise.all([
        Comment.find(filters).select({
            content: 1,
            parentComment: 1,
            stats: 1,
            isEdited: 1,
            editedAt: 1,
            moderation: 1,
            createdAt: 1,
            updatedAt: 1,
        })
        .populate({
            path: 'user',
            select: ['firebaseUid','firstName', 'lastName', 'userName', 'avatar', 'verificationStatus'].join(
                ' '
            ),
        })
        .sort({createdAt:1})
        .skip(skip)
        .limit(limit)
        .lean(),

        Comment.countDocuments(filters),
    ])

    return {
        replies,
        pagination:{
            page,
            limit,
            totalResults,
            totalPages: Math.ceil(totalResults/limit),
            hasNextPage:page*limit < totalResults,
            hasPreviousPage: page > 1,
        }
    }

}