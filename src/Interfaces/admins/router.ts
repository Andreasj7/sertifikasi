import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { postRolesPayloadValidator } from '../../Commons/validators/rolesPayloadValidator';
import {
    postUsersPayloadValidator,
    putUsersPayloadValidator,
} from '../../Commons/validators/usersPayloadValidator';
import AdminsController from './controller';

const AdminsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new AdminsController(container);

    router.post(
        '/role',
        postRolesPayloadValidator,
        validationHandler,
        asyncHandler(controller.postAdminRole)
    );

    router
        .route('/user')
        .get(asyncHandler(controller.getUsers))
        .post(
            postUsersPayloadValidator,
            validationHandler,
            asyncHandler(controller.postAdminUser)
        );

    router
        .route('/user/:id')
        .delete(asyncHandler(controller.deleteUser))
        .put(
            putUsersPayloadValidator,
            validationHandler,
            asyncHandler(controller.putUser)
        );
    return router;
};

export default AdminsRouter;
