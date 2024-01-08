import { body } from 'express-validator';

export const putDirecturSignsPayloadValidator = [
    body('date')
        .optional()
        .isString()
        .withMessage(
            'Tanggal Pengisian Tanda Tangan Directur harus berupa string'
        ),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
