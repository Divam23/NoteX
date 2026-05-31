export const BOOKMARK_ENTITY_TYPE_ENUM = ["Note", "Comment"] as const

export type BookmarkEntityType = (typeof BOOKMARK_ENTITY_TYPE_ENUM)[number];