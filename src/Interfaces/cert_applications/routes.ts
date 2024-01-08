import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import {
    approveCertApplicationsPayloadValidator,
    postCertApplicationsPayloadValidator,
    putCertApplicationsProcessedPayloadValidator,
} from '../../Commons/validators/certApplicationsPayloadValidator';
import CertApplicationsController from './controller';

const CertApplicationsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new CertApplicationsController(container);

    router
        .route('/')
        .get(asyncHandler(controller.getCertApplications))
        .post(
            postCertApplicationsPayloadValidator,
            validationHandler,
            asyncHandler(controller.postCertApplication)
        );

    router.route('/:id').get(asyncHandler(controller.getCertApplicationById));

    router.put(
        '/:id/approve',
        approveCertApplicationsPayloadValidator,
        validationHandler,
        asyncHandler(controller.approveCertApplication)
    );

    router.put(
        '/:id/finish',
        putCertApplicationsProcessedPayloadValidator,
        validationHandler,
        asyncHandler(controller.putCertApplicationProcessed)
    );

    return router;
};

export default CertApplicationsRouter;
