import { IComment } from "../types/comment.types";
import { IUser } from "@/modules/users/types/user.types";

export const mapCommentResponse = ({
    comment,
    isOwner
}:{comment:IComment, isOwner:boolean})=>{
    const user = comment.user as unknown as IUser;
    
    return{
        id:comment._id,
        content:comment.content,
        parentComment:comment.parentComment,
        stats:{
            likesCount:comment.stats?.likesCount || 0,
            repliesCount:comment.stats?.repliesCount || 0,
        },
        isEdited:comment.isEdited,
        createdAt:comment.createdAt,
        updatedAt:comment.updatedAt,
        user:{
            id:user._id,
            userName:user.userName,
            avatar:user.avatar?.url || "",
            verificationStatus:user.verificationStatus
        },
        isOwner
    }
}