import { Request, Response } from 'express';
import { ApiError } from '@/shared/utils/ApiError';
import { ApiResponse } from '@/shared/utils/ApiResponse';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import * as userService from './users.service';
import { personalProfileResponse, publicProfileResponse } from './users.mappers';

export const getCurrentUserPersonalProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }
  const user = await userService.getPersonalProfile(req.user?.uid!);
  return res.status(200).json(new ApiResponse(200, personalProfileResponse(user)));
});

export const getCurrentUserPublicProfile = asyncHandler(async(req:Request, res:Response)=>{
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }
  const user = await userService.getPublicProfile(req.user?.uid!);
  return res.status(200).json(new ApiResponse(200, publicProfileResponse(user)));
})

export const updateCurrentUserProfile = asyncHandler(async(req:Request,res:Response)=>{
    const updatedUserProfile = await userService.updateUserProfile(req.user!.uid,req.body)

    return res.status(200).json(new ApiResponse(200, updatedUserProfile, "User details updated successfully"));
})