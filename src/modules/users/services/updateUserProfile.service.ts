import { ApiError } from "@/shared/utils/ApiError";
import User from "../models/users.model";
import { UpdateProfileDto } from "../dto/updateProfile.dto";

export const updateUserProfile = async(firebaseUid:string, updateData:UpdateProfileDto)=>{
    if(!updateData){
        throw new ApiError(400, "No data found to be updated")
    }
    const updatedUser = await User.findOneAndUpdate(
        {firebaseUid},
        updateData,
        {
            new: true,
            runValidators:true
        }
    ).lean()

    if(!updatedUser){
        throw new ApiError(404, "User not found while updating")
    }

    return updatedUser;
}