import { body } from 'express-validator';

export const putCertStampsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage('Tanggal Stempel Sertifikat harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
