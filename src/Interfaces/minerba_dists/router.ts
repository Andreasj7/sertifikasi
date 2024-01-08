import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putMinerbaDistsPayloadValidator } from '../../Commons/validators/minerbaDistsPayloadValidator';
import MinerbaDistsController from './controller';

const MinerbaDistsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new MinerbaDistsController(container);

    router.get('/', asyncHandler(controller.getMinerbaDists));

    router
        .route('/:id')
        .get(asyncHandler(controller.getMinerbaDistById))
        .put(
            putMinerbaDistsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putMinerbaDist)
        );

    return router;
};

export default MinerbaDistsRouter;
