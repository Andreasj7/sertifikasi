import { body } from 'express-validator';

export const putMinerbaDistsPayloadValidator = [
    body('no')
        .optional()
        .isString()
        .withMessage('Nomer Surat Pendistribusian Minerba harus berupa string'),
    body('date')
        .optional()
        .isString()
        .withMessage(
            'Tanggal Surat Pendistribusian Minerba harus berupa string'
        ),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
