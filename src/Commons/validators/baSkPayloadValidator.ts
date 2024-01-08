import { body } from 'express-validator';

export const putBaSkPayloadValidator = [
    body('noBaDate')
        .optional()
        .isString()
        .withMessage('No & Tgl BA harus berupa string'),
    body('noSkDate')
        .optional()
        .isString()
        .withMessage('No & Tgl SK harus berupa string'),
    body('plenoDate')
        .optional()
        .isString()
        .withMessage('Tanggal Pleno harus berupa string'),
    body('baDate')
        .optional()
        .isString()
        .withMessage('Tanggal BA harus berupa string'),
    body('skDate')
        .optional()
        .isString()
        .withMessage('Tanggal SK harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
