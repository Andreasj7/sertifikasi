/* istanbul ignore file */
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1] ?? '';
        const payload = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_KEY as string
        ) as JwtPayload;
        res.locals.userId = payload.id;
        res.locals.username = payload.username;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            error: 'Unauthorized',
            message: 'Invalid token',
        });
    }
};

export default authenticateJwt;
