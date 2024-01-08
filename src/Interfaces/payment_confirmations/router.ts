import { Router } from 'express';
import { Container } from 'inversify';
import uploadHandler from '../../Commons/middlewares/uploadHandler';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putPaymentConfirmationsPayloadValidator } from '../../Commons/validators/paymentConfirmationsPayloadValidator';
import PaymentConfirmationsController from './controller';

const PaymentConfirmationsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new PaymentConfirmationsController(container);

    router.get('/', asyncHandler(controller.getPaymentConfirmations));

    router
        .route('/:id')
        .get(asyncHandler(controller.getPaymentConfirmationById))
        .put(
            putPaymentConfirmationsPayloadValidator,
            validationHandler,
            uploadHandler,
            asyncHandler(controller.putPaymentConfirmation)
        );

    return router;
};

export default PaymentConfirmationsRouter;
