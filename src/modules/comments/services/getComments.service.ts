import Note from '@/modules/notes/notes.model';
import Comment from '../model/comment.model';
import { ApiError } from '@/shared/utils/ApiError';

type GetCommentOptions = {
    noteId: string;
    page: number;
    limit: number;
};

export const getComments = async ({ noteId, page, limit }: GetCommentOptions) => {
    const filters = {
        note: noteId,
        parentComment: null,
    };

    const note = await Note.findById(noteId).select('_id').lean();

    if (!note) throw new ApiError(404, 'Note not found');

    const skip = (page - 1) * limit;

    const [comments, totalResults] = await Promise.all([
        Comment.find(filters)
            .select({
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
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(limit)
            .lean(),

        Comment.countDocuments(filters),
    ]);

    return {
        comments,
        pagination: {
            page,
            limit,
            totalResults,
            totalPages: Math.ceil(totalResults / limit),
            hasNextPage: page * limit < totalResults,
            hasPreviousPage: page > 1,
        },
    };
};
