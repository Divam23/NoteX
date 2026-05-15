import { Request, Response } from 'express';
import { ApiError } from '@/shared/utils/ApiError';
import { ApiResponse } from '@/shared/utils/ApiResponse';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { mapPersonalProfileResponse } from '../mappers/personalProfile.mapper';
import { mapPublicProfileResponse } from '../mappers/publicProfile.mapper';
import { mapUpdateProfileResponse } from '../mappers/updateProfile.mapper';
import { getPersonalProfile } from '../services/getPersonalProfile.service';
import { getPublicProfile } from '../services/getPublicProfile.service';
import { updateUserProfile } from '../services/updateUserProfile.service';

export const getCurrentUserPersonalProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }
  const user = await getPersonalProfile(req.user?.uid!);
  return res.status(200).json(new ApiResponse(200, mapPersonalProfileResponse(user)));
});

export const getCurrentUserPublicProfile = asyncHandler(async(req:Request, res:Response)=>{
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }
  const user = await getPublicProfile(req.user?.uid!);
  return res.status(200).json(new ApiResponse(200, mapPublicProfileResponse(user)));
})

export const updateCurrentUserProfile = asyncHandler(async(req:Request,res:Response)=>{
    const updatedUserProfile = await updateUserProfile(req.user!.uid,req.body)

    return res.status(200).json(new ApiResponse(200, mapUpdateProfileResponse(updatedUserProfile), "User details updated successfully"));
})