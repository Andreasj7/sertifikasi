import { body } from 'express-validator';

export const putCertManagersPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage(
            'Tanggal Pengisian Manager Sertifikat harus berupa string'
        ),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
