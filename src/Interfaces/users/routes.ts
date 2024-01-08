import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import {
    postUsersPayloadValidator,
    putUsersPayloadValidator,
} from '../../Commons/validators/usersPayloadValidator';
import UsersController from './controller';

const UsersRouter = (container: Container): Router => {
    const router = Router();
    const controller = new UsersController(container);

    router
        .route('/')
        .post(
            postUsersPayloadValidator,
            validationHandler,
            asyncHandler(controller.postUser)
        )
        .get(asyncHandler(controller.getUsers));

    router
        .route('/:id')
        .get(asyncHandler(controller.getUserById))
        .delete(asyncHandler(controller.deleteUser))
        .put(
            putUsersPayloadValidator,
            validationHandler,
            asyncHandler(controller.putUser)
        );

    return router;
};

export default UsersRouter;
