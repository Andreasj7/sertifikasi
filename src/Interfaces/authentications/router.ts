import { Router } from 'express';
import { Container } from 'inversify';
import authenticateJwt from '../../Commons/middlewares/authenticateJwt';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import {
    deleteAuthsPayloadValidator,
    postAuthsPayloadValidator,
    putPasswordPayloadValidator,
} from '../../Commons/validators/authsPayloadValidator';
import AuthenticationsController from './controller';

const AuthenticationsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new AuthenticationsController(container);

    router
        .route('/')
        .post(
            postAuthsPayloadValidator,
            validationHandler,
            asyncHandler(controller.postAuthentication)
        )
        .delete(
            deleteAuthsPayloadValidator,
            validationHandler,
            asyncHandler(controller.deleteAuthentication)
        );

    router.get(
        '/user',
        authenticateJwt,
        asyncHandler(controller.getLoggedUser)
    );

    router.put(
        '/user/password',
        putPasswordPayloadValidator,
        validationHandler,
        asyncHandler(controller.putPassword)
    );

    return router;
};

export default AuthenticationsRouter;
