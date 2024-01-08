import { body } from 'express-validator';

export const putTukConfirmationsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Konfirmasi Penerima ke TUK harus berupa string'),
    body('description')
        .optional()
        .isString()
        .withMessage('Deskripsi harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
