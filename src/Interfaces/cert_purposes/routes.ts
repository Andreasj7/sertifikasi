import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import {
    postCertPurposesPayloadValidator,
    putCertPurposesPayloadValidator,
} from '../../Commons/validators/certPurposesPayloadValidator';
import CertPurposesController from './controller';

const CertPurposesRouter = (container: Container): Router => {
    const router = Router();
    const controller = new CertPurposesController(container);

    router
        .route('/')
        .post(
            postCertPurposesPayloadValidator,
            validationHandler,
            asyncHandler(controller.postCertPurpose)
        )
        .get(asyncHandler(controller.getCertPurposes));

    router
        .route('/:id')
        .get(asyncHandler(controller.getCertPurposeById))
        .put(
            putCertPurposesPayloadValidator,
            validationHandler,
            asyncHandler(controller.putCertPurpose)
        )
        .delete(asyncHandler(controller.deleteCertPurpose));

    return router;
};

export default CertPurposesRouter;
