import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putDirecturSignsPayloadValidator } from '../../Commons/validators/directurSignsPayloadValidator';
import DirecturSignsController from './controller';

const DirecturSignsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new DirecturSignsController(container);

    router.get('/', asyncHandler(controller.getDirecturSigns));

    router
        .route('/:id')
        .get(asyncHandler(controller.getDirecturSignById))
        .put(
            putDirecturSignsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putDirecturSign)
        );

    return router;
};

export default DirecturSignsRouter;
