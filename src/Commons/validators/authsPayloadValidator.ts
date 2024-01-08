import { body } from 'express-validator';

export const postAuthsPayloadValidator = [
    body('username')
        .notEmpty()
        .withMessage('Username harus diisi')
        .isString()
        .withMessage('Username harus berupa string'),
    body('password')
        .notEmpty()
        .withMessage('Password harus diisi')
        .isString()
        .withMessage('Password harus berupa string'),
];

export const deleteAuthsPayloadValidator = [
    body('refreshToken')
        .notEmpty()
        .withMessage('Refresh token harus diisi')
        .isString()
        .withMessage('Refresh token harus berupa string'),
];

export const putAuthsPayloadValidator = [
    body('refreshToken')
        .notEmpty()
        .withMessage('Refresh token harus diisi')
        .isString()
        .withMessage('Refresh token harus berupa string'),
];

export const putPasswordPayloadValidator = [
    body('id')
        .notEmpty()
        .withMessage('Id harus diisi')
        .isString()
        .withMessage('Id harus berupa string'),
    body('password')
        .notEmpty()
        .withMessage('Password harus diisi')
        .isString()
        .withMessage('Password harus berupa string')
        .isLength({ min: 8 })
        .withMessage('Password harus berisi minimal 8 karakter'),
];
