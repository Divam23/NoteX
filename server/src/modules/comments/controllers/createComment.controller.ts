import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiError } from '@/shared/utils/ApiError';
import { createComment } from '../services/createComment.service';
import { mapCommentResponse } from '../mappers/createComment.mapper';
import { CreateCommentDto } from '../dto/createComment.dto';
import { ApiResponse } from '@/shared/utils/ApiResponse';

export const createCommentController = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(404, 'User not found');
    const firebaseUid = req.user.uid;
    const noteId = req.params.noteId as string;
    const commentData = req.body as CreateCommentDto;
    const createdComment = await createComment({ firebaseUid, noteId, commentData });

    if (!createdComment) throw new ApiError(400, 'Comment not created');

    const response = mapCommentResponse({ comment: createdComment, isOwner: true });

    return res.status(201).json(new ApiResponse(201, response, 'Comment created successfully'));
});
