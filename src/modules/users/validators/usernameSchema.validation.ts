import { z } from 'zod';

export const getUsernameSchema = z.object({
    params: z.object({
        username: z.string().min(5).max(30),
    }),
});
