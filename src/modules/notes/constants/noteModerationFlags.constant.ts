export const MODERATION_FLAGS_ENUM = ['spam', 'inappropriate', 'copyright', 'low_quality'] as const;

export type NoteModerationFlagsType = (typeof MODERATION_FLAGS_ENUM)[number];
