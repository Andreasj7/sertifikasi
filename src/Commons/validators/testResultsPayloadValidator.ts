import { body } from 'express-validator';

export const putTestResultsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Hasil Pengujian harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
