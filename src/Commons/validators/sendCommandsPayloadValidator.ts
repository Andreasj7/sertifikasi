import { body } from 'express-validator';

export const putSendCommandsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Peritah Kirim harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
