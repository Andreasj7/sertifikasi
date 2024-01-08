import { body } from 'express-validator';

export const putPaymentConfirmationsPayloadValidator = [
    body('isProcessed')
        .optional()
        .isBoolean()
        .withMessage('Pengerjaan harus berupa boolean'),
];
