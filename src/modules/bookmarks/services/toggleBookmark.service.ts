import User from '@/modules/users/models/users.model';
import Bookmark from '../model/bookmark.model';
import Note from '@/modules/notes/notes.model';
import { ApiError } from '@/shared/utils/ApiError';
import { BookmarkEntityType } from '../constants/bookmarkEntityType.constant';
// import Comment from '@/modules/comments/models/comment.model';

export const toggleBookmark = async(firebaseUid:string, targetType:BookmarkEntityType, targetId:string)=>{
    const user = await User.findOne({firebaseUid}).lean();

    if(!user) throw new ApiError(404, "User not found");

    const toggleExistingBookmark = async ()=>{
        const existingBookmark = await Bookmark.findOne({
            user: user._id,
            targetId,
            targetType,
            
        }).lean()

        if(existingBookmark){
            await Bookmark.findByIdAndDelete(existingBookmark._id);
            return false;
        }

        await Bookmark.create({
            user: user._id,
            targetId,
            targetType,
        })

        return true;
    }

    if (targetType === 'Note') {
        const note = await Note.findById(targetId);

        if (!note) {
            throw new ApiError(404, 'Note not found');
        }

        const bookmarked = await toggleExistingBookmark();

        const updatedNote = await Note.findByIdAndUpdate(
            targetId,
            {
                $inc: {
                    'stats.bookmarksCount': bookmarked ? 1 : -1,
                },
            },
            {
                new: true,
            }
        ).lean();

        return {
            bookmarked,
            bookmarksCount: updatedNote?.stats?.bookmarksCount || 0,
        };
    }

    //COMMENT FEATURE IS UNDER PROGRESS

    // if (targetType === 'Comment') {

    //     const comment =
    //         await Comment.findById(
    //             targetId
    //         );

    //     if (!comment) {
    //         throw new ApiError(
    //             404,
    //             'Comment not found'
    //         );
    //     }

    //     const bookmarked =
    //         await toggleExistingBookmark();

    //     const updatedComment =
    //         await Comment.findByIdAndUpdate(
    //             targetId,
    //             {
    //                 $inc: {
    //                     'stats.bookmarksCount':
    //                         bookmarked ? 1 : -1,
    //                 },
    //             },
    //             {
    //                 new: true,
    //             }
    //         ).lean();

    //     return {
    //         bookmarked,
    //         bookmarkesCount:
    //             updatedComment?.stats
    //                 ?.bookmarkesCount || 0,
    //     };
    // }

    throw new ApiError(400, "Invalid target type");
}