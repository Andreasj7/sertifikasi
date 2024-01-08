import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putPackingsPayloadValidator } from '../../Commons/validators/packingsPayloadValidator';
import PackingsController from './controller';

const PackingsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new PackingsController(container);

    router.get('/', asyncHandler(controller.getPackings));

    router
        .route('/:id')
        .get(asyncHandler(controller.getPackingById))
        .put(
            putPackingsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putPacking)
        );

    return router;
};

export default PackingsRouter;
