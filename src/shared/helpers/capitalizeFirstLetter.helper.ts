export const capitalizeFirst = (s: string) =>
  s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s;