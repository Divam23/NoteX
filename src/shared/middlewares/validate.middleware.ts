import {ZodType}  from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/shared/utils/ApiError';

type ValidatedRequest = {
    body?: Record<string, unknown>;
    params?: Record<string, string>;
    query?: Record<string, unknown>;
};

export const validate = (schema: ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = (await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query,
            })) as ValidatedRequest;

            req.body = parsed.body ?? req.body;
            req.params = parsed.params ?? req.params;
            req.query = parsed.query ?? req.query as any;

            next();
        } catch (error: any) {
            next(new ApiError(400, error.errors?.[0]?.message ?? 'Validation failed'));
        }
    };
};
