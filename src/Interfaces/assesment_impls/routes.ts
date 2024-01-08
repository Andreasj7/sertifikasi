import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putAssesmentImplsPayloadValidator } from '../../Commons/validators/assesmentImplsPayloadValidator';
import AssesmentImplsController from './controller';

const AssesmentImplsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new AssesmentImplsController(container);

    router.get('/', asyncHandler(controller.getAssesmentImpls));

    router
        .route('/:id')
        .get(asyncHandler(controller.getAssesmentImplById))
        .put(
            putAssesmentImplsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putAssesmentImpl)
        );

    return router;
};

export default AssesmentImplsRouter;
