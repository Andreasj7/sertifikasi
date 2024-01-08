import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putAssesmentImplsPayloadValidator } from '../../Commons/validators/assesmentImplsPayloadValidator';
import AssesmentSchedulesController from './controller';

const AssesmentSchedulesRouter = (container: Container): Router => {
    const router = Router();
    const controller = new AssesmentSchedulesController(container);

    router.get('/', asyncHandler(controller.getAssesmentsSchedules));

    router
        .route('/:id')
        .get(asyncHandler(controller.getAssesmentByIdSchedules))
        .put(
            putAssesmentImplsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putAssesmentSchedules)
        );

    return router;
};

export default AssesmentSchedulesRouter;
