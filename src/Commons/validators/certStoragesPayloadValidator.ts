import { body } from 'express-validator';

export const putCertStoragesPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage(
            'Tanggal Pengisian Penyimpanan Sertifikat harus berupa string'
        ),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
