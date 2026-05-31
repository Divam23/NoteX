export const VERIFICATION_ENUM = [
  'not_verified',
  'verified',
  'under_verification',
  'verification_failed'
] as const;

export type VerificationType = typeof VERIFICATION_ENUM[number];