import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putCertStoragesPayloadValidator } from '../../Commons/validators/certStoragesPayloadValidator';
import CertStoragesController from './controller';

const CertStoragesRouter = (container: Container): Router => {
    const router = Router();
    const controller = new CertStoragesController(container);

    router.get('/', asyncHandler(controller.getCertStorages));

    router
        .route('/:id')
        .get(asyncHandler(controller.getCertStorageById))
        .put(
            putCertStoragesPayloadValidator,
            validationHandler,
            asyncHandler(controller.putCertStorage)
        );

    return router;
};

export default CertStoragesRouter;
