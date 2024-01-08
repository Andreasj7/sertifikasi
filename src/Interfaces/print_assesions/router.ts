import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putPrintAssesionsPayloadValidator } from '../../Commons/validators/printAssesionsPayloadValidator';
import PrintAssesionsController from './controller';

const PrintAssesionsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new PrintAssesionsController(container);

    router.get('/', asyncHandler(controller.getPrintAssesions));

    router
        .route('/:id')
        .get(asyncHandler(controller.getPrintAssesionById))
        .put(
            putPrintAssesionsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putPrintAssesion)
        );

    return router;
};

export default PrintAssesionsRouter;
