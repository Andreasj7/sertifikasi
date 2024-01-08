import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putMinerbaDatasPayloadValidator } from '../../Commons/validators/minerbaDatasPayloadValidator';
import MinerbaDatasController from './controller';

const MinerbaDatasRouter = (container: Container): Router => {
    const router = Router();
    const controller = new MinerbaDatasController(container);

    router.get('/', asyncHandler(controller.getMinerbaDatas));

    router
        .route('/:id')
        .get(asyncHandler(controller.getMinerbaDataById))
        .put(
            putMinerbaDatasPayloadValidator,
            validationHandler,
            asyncHandler(controller.putMinerbaData)
        );

    return router;
};

export default MinerbaDatasRouter;
