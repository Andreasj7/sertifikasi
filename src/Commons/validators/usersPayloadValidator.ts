import { body } from 'express-validator';

export const postUsersPayloadValidator = [
    body('username')
        .notEmpty()
        .withMessage('Username harus diisi')
        .isString()
        .withMessage('Username harus berupa string'),
    body('fullname')
        .notEmpty()
        .withMessage('Fullname harus diisi')
        .isString()
        .withMessage('Fullname harus berupa string'),
    body('password')
        .notEmpty()
        .withMessage('Password harus diisi')
        .isString()
        .withMessage('Password harus berupa string'),
    body('roleId')
        .notEmpty()
        .withMessage('Role Id harus diisi')
        .isString()
        .withMessage('Rold Id harus berupa string'),
];

export const putUsersPayloadValidator = [
    body('username')
        .optional()
        .isString()
        .withMessage('Username harus berupa string'),
    body('fullname')
        .optional()
        .isString()
        .withMessage('Fullname harus berupa string'),
    body('roleId')
        .optional()
        .isString()
        .withMessage('Rold Id harus berupa string'),
];
