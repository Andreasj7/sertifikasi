import { body } from 'express-validator';

export const postSchemaPayloadValidator = [
    body('schema')
        .notEmpty()
        .withMessage('Skema harus diisi')
        .isString()
        .withMessage('Skema harus berupa string'),
];

export const putSchemaPayloadValidator = [
    body('schema')
        .optional()
        .isString()
        .withMessage('Skema harus berupa string'),
];
