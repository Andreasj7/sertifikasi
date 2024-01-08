import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putCertScannersPayloadValidator } from '../../Commons/validators/certScannersPayloadValidator';
import CertScannersController from './controller';

const CertScannersRouter = (container: Container): Router => {
    const router = Router();
    const controller = new CertScannersController(container);

    router.get('/', asyncHandler(controller.getCertScanners));

    router
        .route('/:id')
        .get(asyncHandler(controller.getCertScannerById))
        .put(
            putCertScannersPayloadValidator,
            validationHandler,
            asyncHandler(controller.putCertScanner)
        );

    return router;
};

export default CertScannersRouter;
