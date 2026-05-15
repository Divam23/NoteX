import { IUser } from "../types/user.types";

export const mapUpdateProfileResponse = (user:IUser)=>({
    firstName:user.firstName,
    lastName:user.lastName,
    userName:user.userName,
    avatar:user.avatar,
    bio:user.bio,
    college:user.college,
    subject:user.subject,
    course:user.course,
    university:user.university,
    semester:user.semester,
    roles:user.roles,
    verificationStatus:user.verificationStatus,
})