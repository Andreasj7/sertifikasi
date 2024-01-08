import { body } from 'express-validator';

export const putPrintBlanksPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Cetak Blanko harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
