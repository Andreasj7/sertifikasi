import { body } from 'express-validator';

export const putPrintAssesionsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Cetak Foto Asesi harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
