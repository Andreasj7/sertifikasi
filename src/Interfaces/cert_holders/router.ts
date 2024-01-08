import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putCertHoldersPayloadValidator } from '../../Commons/validators/certHoldersPayloadValidator';
import CertHoldersController from './controller';

const CertHoldersRouter = (container: Container): Router => {
    const router = Router();
    const controller = new CertHoldersController(container);

    router.get('/', asyncHandler(controller.getCertHolders));

    router
        .route('/:id')
        .get(asyncHandler(controller.getCertHolderById))
        .put(
            putCertHoldersPayloadValidator,
            validationHandler,
            asyncHandler(controller.putCertHolder)
        );

    return router;
};

export default CertHoldersRouter;
