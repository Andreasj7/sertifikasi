import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putTukConfirmationsPayloadValidator } from '../../Commons/validators/tukConfirmationsPayloadValidator';
import TukConfirmationsController from './controller';

const TukConfirmationsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new TukConfirmationsController(container);

    router.get('/', asyncHandler(controller.getTukConfirmations));

    router
        .route('/:id')
        .get(asyncHandler(controller.getTukConfirmationById))
        .put(
            putTukConfirmationsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putTukConfirmation)
        );

    return router;
};

export default TukConfirmationsRouter;
