import { ApiError } from "@/shared/utils/ApiError";
import User from "../users.model";
import { UpdateProfileDto } from "../dto/updateProfile.dto";

export const updateUserProfile = async(firebaseUid:string, updateData:UpdateProfileDto)=>{
    const updatedUser = await User.findOneAndUpdate(
        {firebaseUid},
        updateData,
        {
            new: true,
            validators:true
        }
    ).lean()

    if(!updatedUser){
        throw new ApiError(404, "User not found while updating")
    }

    return updatedUser;
}