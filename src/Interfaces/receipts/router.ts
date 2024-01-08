import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putReceiptsPayloadValidator } from '../../Commons/validators/receiptssPayloadValidator';
import ReceiptsController from './controller';

const ReceiptsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new ReceiptsController(container);

    router.get('/', asyncHandler(controller.getReceipts));

    router
        .route('/:id')
        .get(asyncHandler(controller.getReceiptById))
        .put(
            putReceiptsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putReceipt)
        );

    return router;
};

export default ReceiptsRouter;
