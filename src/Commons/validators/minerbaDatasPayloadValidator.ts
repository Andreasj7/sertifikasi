import { body } from 'express-validator';

export const putMinerbaDatasPayloadValidator = [
    body('no')
        .optional()
        .isString()
        .withMessage('Nomer Register Minerba harus berupa string'),
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Register Minerba harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
