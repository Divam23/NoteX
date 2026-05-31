export const NOTE_STATUS_ENUM = ['published', 'draft', 'pending_review', 'rejected'] as const;

export type NoteStatusType = (typeof NOTE_STATUS_ENUM)[number];
