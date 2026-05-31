export const NOTE_CONTENT_TYPE_ENUM = ['pdf', 'docx', 'txt', 'pptx', 'image'] as const;

export type NoteContentType = (typeof NOTE_CONTENT_TYPE_ENUM)[number];
