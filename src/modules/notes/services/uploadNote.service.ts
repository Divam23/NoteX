import { ApiError } from '@/shared/utils/ApiError';
import Note from '../notes.model';
import User from '../../users/models/users.model';
import { validateFile } from '@/infrastructure/storage/utils/validateFile';
import { getNoteContentType } from '@/infrastructure/storage/utils/getNoteContentType';
import { generateNoteFilePath } from '@/infrastructure/storage/utils/filePathGenerator';
import firebaseStorageProvider from '@/infrastructure/storage/providers/firebase.provider';
import { CreateNoteDto } from '../dto/createNote.dto';
import { supportsThumbnailGeneration } from '@/shared/helpers/supportedFileTypeForThumbnail';

export const createNote = async ({
    firebaseUid,
    noteData,
    uploadedFile,
}: {
    firebaseUid: string;
    noteData: CreateNoteDto;
    uploadedFile: Express.Multer.File;
}) => {
    const user = await User.findOne({
        firebaseUid,
    }).lean();

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    validateFile(uploadedFile.mimetype, uploadedFile.size);

    const contentType = getNoteContentType(uploadedFile.mimetype);

    if (!contentType) {
        throw new ApiError(400, 'Unsupported file type');
    }

    const path = generateNoteFilePath(user._id.toString(), uploadedFile.originalname);

    let fileUrl = '';

    try {
        fileUrl = await firebaseStorageProvider.uploadFile(
            uploadedFile.buffer,
            path,
            uploadedFile.mimetype
        );

        const note = await Note.create({
            ...noteData,
            file: {
                url: fileUrl,
                storagePath: path,
                mimeType: uploadedFile.mimetype,
                size: uploadedFile.size,
            },
            contentType,
            uploader: user._id,
        });

        return note;
    } catch (error) {
        if (fileUrl) {
            try {
                await firebaseStorageProvider.deleteFile(fileUrl);
            } catch (cleanupError) {
                console.error('Rollback failed', cleanupError);
                throw new ApiError(500, "Internal server error", [cleanupError])
            }
        }
        console.log(error);
        throw new ApiError(500, 'File Upload failed', [error]);
    }
};
