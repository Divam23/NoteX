export const ROLE_ENUM = [
  'student',
  'teacher',
  'lecturer',
  'teaching_assistant',
  'postgraduate_student',
  'alumni',
  'guest',
] as const;

export type RoleType = typeof ROLE_ENUM[number];