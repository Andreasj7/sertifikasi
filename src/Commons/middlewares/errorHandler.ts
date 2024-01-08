/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import ClientError from '../exceptions/ClientError';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ClientError) {
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message,
        });
    } else {
        return res.status(500).json({
            status: 'error',
            message: 'Maaf terjadi kegagalan pada server kami',
        });
    }
};

export default errorHandler;
