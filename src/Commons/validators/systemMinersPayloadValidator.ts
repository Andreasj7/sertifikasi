import { body } from 'express-validator';

export const putSystemMinersPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage(
            'Tanggal Pengisian Laporan Sistem Miners harus berupa string'
        ),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
