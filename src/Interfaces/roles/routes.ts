import { Router } from 'express';
import { Container } from 'inversify';
import 'reflect-metadata';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import {
    postRolesPayloadValidator,
    putRolesPayloadValidator,
} from '../../Commons/validators/rolesPayloadValidator';
import RolesController from './controller';

const RolesRouter = (container: Container): Router => {
    const router = Router();
    const controller = new RolesController(container);

    router
        .route('/')
        .post(
            postRolesPayloadValidator,
            validationHandler,
            asyncHandler(controller.postRole)
        )
        .get(asyncHandler(controller.getRoles));

    router
        .route('/:id')
        .get(asyncHandler(controller.getRoleById))
        .delete(asyncHandler(controller.deleteRoleById))
        .put(
            putRolesPayloadValidator,
            validationHandler,
            asyncHandler(controller.editRoleById)
        );

    return router;
};

export default RolesRouter;
