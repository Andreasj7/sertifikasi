import { Router } from 'express';
import { Container } from 'inversify';
import validationHandler from '../../Commons/middlewares/validationHandler';
import { asyncHandler } from '../../Commons/utils';
import { putSendCommandsPayloadValidator } from '../../Commons/validators/sendCommandsPayloadValidator';
import SendCommandsController from './controller';

const SendCommandsRouter = (container: Container): Router => {
    const router = Router();
    const controller = new SendCommandsController(container);

    router.get('/', asyncHandler(controller.getSendCommands));

    router
        .route('/:id')
        .get(asyncHandler(controller.getSendCommandById))
        .put(
            putSendCommandsPayloadValidator,
            validationHandler,
            asyncHandler(controller.putSendCommand)
        );

    return router;
};

export default SendCommandsRouter;
