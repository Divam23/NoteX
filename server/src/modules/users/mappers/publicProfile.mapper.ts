import { IUser } from "../types/user.types";

export const mapPublicProfileResponse = (user:IUser)=>({
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    bio: user.bio,
    college: user.college,
    course: user.course,
    subject: user.subject,
    university: user.university,
    semester: user.semester,
    verificationStatus: user.verificationStatus,
    roles: user.roles,
    stats: {
        followersCount: user.stats.followersCount,
        followingCount: user.stats.followingCount,
        notesCount: user.stats.notesUploadedCount,
    },
})