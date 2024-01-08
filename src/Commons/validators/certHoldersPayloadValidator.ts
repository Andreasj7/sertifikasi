import { body } from 'express-validator';

export const putCertHoldersPayloadValidator = [
    body('certHolder')
        .optional()
        .isString()
        .withMessage('Data pemegang sertifikasi harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
