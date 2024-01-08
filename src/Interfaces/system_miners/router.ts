import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putSystemMinersPayloadValidator } from '../../Commons/validators/systemMinersPayloadValidator';
import SystemMinerssController from './controller';

const SystemMinerssRouter = (container: Container): Router => {
    const router = Router();
    const controller = new SystemMinerssController(container);

    router.get('/', asyncHandler(controller.getSystemMinerss));

    router
        .route('/:id')
        .get(asyncHandler(controller.getSystemMinersById))
        .put(
            putSystemMinersPayloadValidator,
            validationHandler,
            asyncHandler(controller.putSystemMiners)
        );

    return router;
};

export default SystemMinerssRouter;
