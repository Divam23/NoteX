import { ApiError } from "@/shared/utils/ApiError";
import User from "../users.model";

export const getPersonalProfile = async (firebaseUid: string) => {
  const user = await User.findOne(
    { firebaseUid },
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      userName: 1,
      avatar: 1,
      bio: 1,
      college: 1,
      course: 1,
      subject: 1,
      university: 1,
      semester: 1,
      isVerified: 1,
      roles: 1,
      preferences: 1,
      stats: 1,
      moderation: 1,
      lastLoginAt: 1,
      lastUpdated: 1,
    }
  ).lean();

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};