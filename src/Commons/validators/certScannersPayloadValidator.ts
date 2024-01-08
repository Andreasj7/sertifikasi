import { body } from 'express-validator';

export const putCertScannersPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage(
            'Tanggal Pengisian Scanner Sertifikat harus berupa string'
        ),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
