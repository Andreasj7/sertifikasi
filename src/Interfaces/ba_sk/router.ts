import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putBaSkPayloadValidator } from '../../Commons/validators/baSkPayloadValidator';
import BaSksController from './controller';

const BaSksRouter = (container: Container): Router => {
    const router = Router();
    const controller = new BaSksController(container);

    router.get('/', asyncHandler(controller.getBaSkList));

    router
        .route('/:id')
        .get(asyncHandler(controller.getBaSkById))
        .put(
            putBaSkPayloadValidator,
            validationHandler,
            asyncHandler(controller.putBaSk)
        );

    return router;
};

export default BaSksRouter;
