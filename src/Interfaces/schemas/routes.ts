import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import {
    postSchemaPayloadValidator,
    putSchemaPayloadValidator,
} from '../../Commons/validators/schemasPayloadValidator';
import SchemasController from './container';

const SchemasRouter = (container: Container): Router => {
    const router = Router();
    const controller = new SchemasController(container);

    router
        .route('/')
        .post(
            postSchemaPayloadValidator,
            validationHandler,
            asyncHandler(controller.postSchema)
        )
        .get(asyncHandler(controller.getSchemas));

    router
        .route('/:id')
        .get(asyncHandler(controller.getSchemaById))
        .delete(asyncHandler(controller.deleteSchema))
        .put(
            putSchemaPayloadValidator,
            validationHandler,
            asyncHandler(controller.putSchema)
        );

    return router;
};

export default SchemasRouter;
