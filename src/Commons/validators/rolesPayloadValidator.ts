import { body } from 'express-validator';

export const postRolesPayloadValidator = [
    body('role')
        .notEmpty()
        .withMessage('Role harus diisi')
        .isString()
        .withMessage('Role harus berupa string'),
];

export const putRolesPayloadValidator = [
    body('role').optional().isString().withMessage('Role harus berupa string'),
];
