export const NOTE_CATEGORY_ENUM = [
  'lecture_notes',
  'previous_year_paper',
  'summaries',
  'assignments',
  'lab_manual',
  'others',
] as const;

export type NoteCategoryType = (typeof NOTE_CATEGORY_ENUM)[number];
