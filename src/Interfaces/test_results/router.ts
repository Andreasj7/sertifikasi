import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putTestResultsPayloadValidator } from '../../Commons/validators/testResultsPayloadValidator';
import TestResultsController from './controller';

const TestResultsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new TestResultsController(container);

    router.get('/', asyncHandler(controller.getTestResults));

    router
        .route('/:id')
        .get(asyncHandler(controller.getTestResultById))
        .put(
            putTestResultsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putTestResult)
        );

    return router;
};

export default TestResultsRouter;
