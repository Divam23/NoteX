import { ApiError } from "@/shared/utils/ApiError";
import { thumbnailMimeMap } from "./mimeMap";

const MAX_FILE_SIZE = 5*1024*1024;

export const validateThumbnailFile = (mimeType:string, size:number)=>{
  if (!thumbnailMimeMap[mimeType as keyof typeof thumbnailMimeMap]) {
    throw new ApiError(400, 'Invalid file type');
  }

  if (size > MAX_FILE_SIZE) {
    throw new ApiError(400, 'File size exceeds limit');
  }
}