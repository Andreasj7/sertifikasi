import { body } from 'express-validator';

export const putCertDistsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Pendistribusian Sertifikat harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
