import { body } from 'express-validator';

export const postSptAssesorsPayloadValidator = [
    body('idCertApplication')
        .notEmpty()
        .withMessage('Id Permohonan Sertifikasi harus diisi')
        .isString()
        .withMessage('Id Permohonan Sertifikasi harus berupa string'),
];

export const putSptAssesorsPayloadValidator = [
    body('noSptAssesor')
        .optional()
        .isString()
        .withMessage('No SPT Assesor harus berupa string'),
    body('assesorDate')
        .optional()
        .isString()
        .withMessage('Tanggal SPT Assesor harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
