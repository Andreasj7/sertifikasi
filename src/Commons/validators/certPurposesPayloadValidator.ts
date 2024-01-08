import { body } from 'express-validator';

export const postCertPurposesPayloadValidator = [
    body('purpose')
        .notEmpty()
        .withMessage('Tujuan Sertifikasi harus diisi')
        .isString()
        .withMessage('Tujuan Sertifikasi harus berupa string'),
];

export const putCertPurposesPayloadValidator = [
    body('purpose')
        .optional()
        .isString()
        .withMessage('Tujuan Sertifikasi harus berupa string'),
];
