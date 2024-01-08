import { body } from 'express-validator';

export const putPrintCompensationsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Cetak Kartu Kompensasi harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
