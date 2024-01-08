import { body } from 'express-validator';

export const putCardDistsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Pendistribusian Kartu harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
