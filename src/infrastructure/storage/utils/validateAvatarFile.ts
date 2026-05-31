import { ApiError } from "@/shared/utils/ApiError";
import { avatarMimeMap } from "./mimeMap";

const MAX_FILE_SIZE = 5*1024*1024;

export const validateAvatarFile = (mimeType:string, size:number)=>{
  if (!avatarMimeMap[mimeType as keyof typeof avatarMimeMap]) {
    throw new ApiError(400, 'Invalid file type');
  }

  if (size > MAX_FILE_SIZE) {
    throw new ApiError(400, 'File size exceeds limit');
  }
}