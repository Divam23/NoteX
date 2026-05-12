import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

import { ApiError } from "@/shared/utils/ApiError";

export const validate = (schema: ZodSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.parseAsync(req.body);

      next();
    } catch (error: any) {
      next(
        new ApiError(
          400,
          error.errors?.[0]?.message ||
            "Validation failed"
        )
      );
    }
  };
};