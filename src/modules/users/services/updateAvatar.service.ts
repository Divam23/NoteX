import User from "../models/users.model";
import { generateAvatarFilePath } from "@/infrastructure/storage/utils/filePathGenerator";
import { ApiError } from "@/shared/utils/ApiError";
import firebaseStorageProvider from "@/infrastructure/storage/providers/firebase.provider";
import { validateAvatarFile } from "@/infrastructure/storage/utils/validateAvatarFile";

export const updateProfileAvatar = async(firebaseUid: string, uploadedAvatarFile:Express.Multer.File)=>{
    const user = await User.findOne({firebaseUid});
    if(!user){
        throw new ApiError(404, "User not found");
    }

    if(!uploadedAvatarFile){
        throw new ApiError(404, "No file uploaded")
    }

    validateAvatarFile(uploadedAvatarFile.mimetype, uploadedAvatarFile.size);

    const path = generateAvatarFilePath(user._id.toString(), uploadedAvatarFile.originalname);

    let avatarUrl = "";
    let oldAvatarUrl = user.avatar?.url;

    try {
        avatarUrl = await firebaseStorageProvider.uploadFile(uploadedAvatarFile.buffer, path, uploadedAvatarFile.mimetype)

        user.avatar.url = avatarUrl;
        user.avatar.storagePath = path;

        await user.save();

        if(oldAvatarUrl){
            await firebaseStorageProvider.deleteFile(oldAvatarUrl);
        }

        return avatarUrl;

    } catch (error) {
        if(path){
            await firebaseStorageProvider.deleteFile(path).catch(()=>{})
        }
        throw new ApiError(500, "Failed to update avatar!!!")
    }

}