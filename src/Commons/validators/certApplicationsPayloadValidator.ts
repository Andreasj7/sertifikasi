import { body } from 'express-validator';

export const postCertApplicationsPayloadValidator = [
    body('tukName')
        .notEmpty()
        .withMessage('Nama TUK harus diisi')
        .isString()
        .withMessage('Nama TUK harus berupa string'),
    body('assesmentDate')
        .notEmpty()
        .withMessage('Tanggal Assesmen harus diisi')
        .isString()
        .withMessage('Tanggal Assesmen harus berupa string'),
    body('referenceNumber')
        .notEmpty()
        .withMessage('Nomer Surat harus diisi')
        .isString()
        .withMessage('Nomer Surat harus berupa string'),
    body('receiptDate')
        .notEmpty()
        .withMessage('Tanggal Terima harus diisi')
        .isString()
        .withMessage('Tanggal Terima harus berupa string'),
    body('idCertPurpose')
        .notEmpty()
        .withMessage('Id Tujuan Sertifikasi harus diisi')
        .isString()
        .withMessage('Id Tujuan Sertifikasi harus berupa string'),
];

export const approveCertApplicationsPayloadValidator = [
    body('isApproved')
        .optional()
        .isBoolean()
        .withMessage('Persetujuan harus berupa boolean'),
];

export const putCertApplicationsProcessedPayloadValidator = [
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
