import { body } from 'express-validator';

export const putBlankApplicationsPayloadValidator = [
    body('noBlank')
        .optional()
        .isString()
        .withMessage('Nomor Permohonan Blanko harus berupa string'),
    body('dateBlank')
        .optional()
        .isString()
        .withMessage('Tanggal Surat Permohonan Blanko harus berupa string'),
    body('noHandover')
        .optional()
        .isString()
        .withMessage('Nomor BA Serah Terima Blanko harus berupa string'),
    body('dateHandover')
        .optional()
        .isString()
        .withMessage('Tanggal BA Serah Terima Blanko harus berupa string'),
    body('blankReceiptDate')
        .optional()
        .isString()
        .withMessage('Tanggal Terima Blanko harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
