import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putPrintBlanksPayloadValidator } from '../../Commons/validators/printBlanksPayloadValidator';
import PrintBlanksController from './controller';

const PrintBlanksRouter = (container: Container): Router => {
    const router = Router();
    const controller = new PrintBlanksController(container);

    router.get('/', asyncHandler(controller.getPrintBlanks));

    router
        .route('/:id')
        .get(asyncHandler(controller.getPrintBlankById))
        .put(
            putPrintBlanksPayloadValidator,
            validationHandler,
            asyncHandler(controller.putPrintBlank)
        );

    return router;
};

export default PrintBlanksRouter;
