import { body } from 'express-validator';

export const putInvoiceDistsPayloadValidator = [
    body('invoiceDate')
        .optional()
        .isString()
        .withMessage('Tanggal Pendistribusian Invoice harus berupa string'),
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
