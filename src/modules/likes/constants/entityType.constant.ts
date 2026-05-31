export const ENTITY_TYPE_ENUM = ["Note", "Comment"] as const

export type EntityType = (typeof ENTITY_TYPE_ENUM)[number];