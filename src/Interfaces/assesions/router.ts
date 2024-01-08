import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putAssesionsPayloadValidator } from '../../Commons/validators/assesionsPayloadValidator';
import AssesionsController from './controller';

const AssesionsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new AssesionsController(container);

    router.get('/', asyncHandler(controller.getAssesions));

    router
        .route('/:id')
        .get(asyncHandler(controller.getAssesionsById))
        .put(
            putAssesionsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putAssesion)
        );

    return router;
};

export default AssesionsRouter;
