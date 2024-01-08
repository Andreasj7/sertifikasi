import { body } from 'express-validator';

export const putAssesionsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal pengisian harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
