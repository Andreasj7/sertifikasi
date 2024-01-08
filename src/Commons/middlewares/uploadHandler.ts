/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'path';
import InvariantError from '../exceptions/InvariantError';

const IMAGE_DESTINATION = path.join(
    __dirname,
    '../../../public/storages/images/'
);
const ALLOWED_IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif)$/;
const FOLDER_NAME = path.join(__dirname, '../../../public/storages/images');

const uploadHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!fs.existsSync(FOLDER_NAME)) {
        fs.mkdirSync(FOLDER_NAME, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, IMAGE_DESTINATION);
        },
        filename(req, file, cb) {
            const filename = file.originalname.replace(/\s+/g, '');
            cb(null, `${+Date.now()}-${filename}`);
        },
    });

    const fileFilter = (req: any, file: any, cb: any) => {
        if (!file.originalname.toLowerCase().match(ALLOWED_IMAGE_EXTENSIONS)) {
            return cb(
                new InvariantError('Hanya file gambar yang diizinkan!'),
                false
            );
        }
        cb(null, true);
    };

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 526000,
        },
    });

    upload.single('proof')(req, res, async (err) => {
        if (err) {
            return next(err);
        }

        next();
    });
};

export default uploadHandler;
