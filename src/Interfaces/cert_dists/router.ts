import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putCertDistsPayloadValidator } from '../../Commons/validators/certDistsPayloadValidator';
import CertDistsController from './controller';

const CertDistsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new CertDistsController(container);

    router.get('/', asyncHandler(controller.getCertDists));

    router
        .route('/:id')
        .get(asyncHandler(controller.getCertDistById))
        .put(
            putCertDistsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putCertDist)
        );

    return router;
};

export default CertDistsRouter;
