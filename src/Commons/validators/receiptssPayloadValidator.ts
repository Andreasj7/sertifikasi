import { body } from 'express-validator';

export const putReceiptsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Input Resi Pengiriman harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
