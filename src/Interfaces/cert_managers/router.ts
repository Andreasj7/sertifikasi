import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putCertManagersPayloadValidator } from '../../Commons/validators/certManagersPayloadValidator';
import CertManagersController from './controller';

const CertManagersRouter = (container: Container): Router => {
    const router = Router();
    const controller = new CertManagersController(container);

    router.get('/', asyncHandler(controller.getCertManagers));

    router
        .route('/:id')
        .get(asyncHandler(controller.getCertManagerById))
        .put(
            putCertManagersPayloadValidator,
            validationHandler,
            asyncHandler(controller.putCertManager)
        );

    return router;
};

export default CertManagersRouter;
