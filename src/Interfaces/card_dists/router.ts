import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putCardDistsPayloadValidator } from '../../Commons/validators/cardDistsPayloadValidator';
import CardDistsController from './controller';

const CardDistsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new CardDistsController(container);

    router.get('/', asyncHandler(controller.getCardDists));

    router
        .route('/:id')
        .get(asyncHandler(controller.getCardDistById))
        .put(
            putCardDistsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putCardDist)
        );

    return router;
};

export default CardDistsRouter;
