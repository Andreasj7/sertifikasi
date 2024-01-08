import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putSptAssesorsPayloadValidator } from '../../Commons/validators/sptAssesorsPayloadValidator';
import SptAssesorsController from './controller';

const SptAssesorsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new SptAssesorsController(container);

    router.get('/', asyncHandler(controller.getSptAssesors));

    router
        .route('/:id')
        .get(asyncHandler(controller.getSptAssesorById))
        .put(
            putSptAssesorsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putSptAssesor)
        );

    return router;
};

export default SptAssesorsRouter;
