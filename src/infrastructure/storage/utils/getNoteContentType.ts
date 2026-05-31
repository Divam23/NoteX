import { fileMimeMap } from './mimeMap';

export const getNoteContentType = (
  mimeType: string
) => {

  return fileMimeMap[
    mimeType as keyof typeof fileMimeMap
  ] || null;
};