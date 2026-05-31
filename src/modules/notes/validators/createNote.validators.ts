import { capitalizeFirst } from '@/shared/helpers/capitalizeFirstLetter.helper';
import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z
    .preprocess((v) => (typeof v === 'string' ? v.trim() : v), z.string().min(3).max(120))
    .transform((s) => capitalizeFirst(s)),

  description: z.preprocess((v) => {
    if (typeof v !== 'string') return v;
    const trimmed = v.trim();
    return trimmed.length ? capitalizeFirst(trimmed) : trimmed;
  }, z.string().max(1000).optional()),

  subject: z.string().trim().min(1).max(100),

  category: z.enum([
    'lecture_notes',
    'previous_year_paper',
    'summaries',
    'assignments',
    'lab_manual',
    'others',
  ]),

  tags: z
    .array(z.string().trim().min(1).max(30))
    .max(10, 'At most 10 tags can be applied')
    .optional()
    .transform((tags) => {
      if (!tags) return undefined;
      const normalized = tags.map((t) => t.toLowerCase());
      return Array.from(new Set(normalized));
    }),

  course: z.string().trim().max(100).optional(),

  university: z.string().trim().max(100).optional(),

  semester: z.coerce.number().int().min(1).max(10).optional(),

  language: z.string().trim().length(2).default('en'),

  isPublic: z.boolean().default(true),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
