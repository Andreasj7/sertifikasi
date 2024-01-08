import { body } from 'express-validator';

export const putPackingsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Packing harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
