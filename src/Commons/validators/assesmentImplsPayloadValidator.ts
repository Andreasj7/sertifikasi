import { body } from 'express-validator';

export const putAssesmentImplsPayloadValidator = [
    body('lspAdmin')
        .optional()
        .isString()
        .withMessage('Admin Lsp harus berupa string'),
    body('assesorName')
        .optional()
        .isString()
        .withMessage('Nama Asesor harus berupa string'),
    body('assesionNumber')
        .optional()
        .isNumeric()
        .withMessage('Jumlah Asesor harus berupa numeric'),
    body('idSchema')
        .optional()
        .isString()
        .withMessage('Id Skema harus berupa string'),
    body('asesorRecommendation')
        .optional()
        .isString()
        .withMessage('Rekomendasi Asesor harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
