import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putInvoiceDistsPayloadValidator } from '../../Commons/validators/invoiceDistsPayloadValidator';
import InvoiceDistsController from './controller';

const InvoiceDistsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new InvoiceDistsController(container);

    router.get('/', asyncHandler(controller.getInvoiceDists));

    router
        .route('/:id')
        .get(asyncHandler(controller.getInvoiceDistById))
        .put(
            putInvoiceDistsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putInvoiceDist)
        );

    return router;
};

export default InvoiceDistsRouter;
