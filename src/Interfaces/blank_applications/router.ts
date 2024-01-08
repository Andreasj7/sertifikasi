import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putBlankApplicationsPayloadValidator } from '../../Commons/validators/blankApplicationsPayloadValidator';
import BlankApplicationsController from './controller';

const BlankApplicationsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new BlankApplicationsController(container);

    router.get('/', asyncHandler(controller.getBlankApplications));

    router
        .route('/:id')
        .get(asyncHandler(controller.getBlankApplicationById))
        .put(
            putBlankApplicationsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putBlankApplication)
        );

    return router;
};

export default BlankApplicationsRouter;
