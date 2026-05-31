import { generateNoteThumbnailFilePath } from '@/infrastructure/storage/utils/filePathGenerator';
import Note from '../notes.model';
import { ApiError } from '@/shared/utils/ApiError';
import firebaseStorageProvider from '@/infrastructure/storage/providers/firebase.provider';
import { validateThumbnailFile } from '@/infrastructure/storage/utils/validateThumbnailFile';
import User from '@/modules/users/models/users.model';
import { getNoteContentType } from '@/infrastructure/storage/utils/getNoteContentType';


//Thumbnail service is on hold for now until all other important work is done
//Most probably will be done just before the launch of MVP because it requires redis+BullMQ setup
export const uploadThumbnail = async (
    firebaseUid: string,
    uploadedThumbnailFile: Express.Multer.File
) => {
    const user = await User.findOne({ firebaseUid }).lean();
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    if (!uploadedThumbnailFile) {
        throw new ApiError(404, 'No file uploaded');
    }
    // const contentType = getNoteContentType(uploadedFile.mimetype);

    // if (contentType && ['pdf', 'docx', 'pptx'].includes(contentType)) {
    //     // generate thumbnail
    // }
};
