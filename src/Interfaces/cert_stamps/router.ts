import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putCertStampsPayloadValidator } from '../../Commons/validators/certStampsPayloadValidator';
import CertStampsController from './controller';

const CertStampsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new CertStampsController(container);

    router.get('/', asyncHandler(controller.getCertStamps));

    router
        .route('/:id')
        .get(asyncHandler(controller.getCertStampById))
        .put(
            putCertStampsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putCertStamp)
        );

    return router;
};

export default CertStampsRouter;
