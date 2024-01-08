/* istanbul ignore file */
import { NextFunction, Request, Response } from 'express';

export const asyncHandler =
    (
        callback: (
            req: Request,
            res: Response,
            next: NextFunction
        ) => Promise<unknown>
    ) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            next(error);
        }
    };
