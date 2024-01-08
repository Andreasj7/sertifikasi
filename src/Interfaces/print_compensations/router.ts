import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putPrintCompensationsPayloadValidator } from '../../Commons/validators/printCompensationsPayloadValidator';
import PrintCompensationsController from './controller';

const PrintCompensationsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new PrintCompensationsController(container);

    router.get('/', asyncHandler(controller.getPrintCompensations));

    router
        .route('/:id')
        .get(asyncHandler(controller.getPrintCompensationById))
        .put(
            putPrintCompensationsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putPrintCompensation)
        );

    return router;
};

export default PrintCompensationsRouter;
