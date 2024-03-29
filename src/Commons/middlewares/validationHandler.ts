/* istanbul ignore file */
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map(({ msg }) => msg);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            message: errorMessages[0],
        });
    }
    next();
};

export default validationHandler;
