import { IUser } from "../types/user.types";

export const mapPersonalProfileResponse = (user: IUser) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    avatar: user.avatar,
    bio: user.bio,
    college: user.college,
    course: user.course,
    subject: user.subject,
    university: user.university,
    semester: user.semester,
    verificationStatus: user.verificationStatus,
    roles: user.roles,
    preferences: user.preferences,
    stats: user.stats,
    moderation: user.moderation,
    lastLoginAt: user.lastLoginAt,
    lastUpdatedAt:user.updatedAt
});