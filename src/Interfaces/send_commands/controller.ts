import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditSendCommandUseCase from '../../Applications/use_case/send_commands/EditSendCommandUseCase';
import GetSendCommandByIdUseCase from '../../Applications/use_case/send_commands/GetSendCommandByIdUseCase';
import GetSendCommandsUseCase from '../../Applications/use_case/send_commands/GetSendCommandsUseCase';

class SendCommandsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getSendCommands(req: Request, res: Response) {
        const getSendCommandsUseCase = this.container.get(
            GetSendCommandsUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const sendCommands = await getSendCommandsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { sendCommands },
        });
    }

    @autobind
    async getSendCommandById(req: Request, res: Response) {
        const getSendCommandByIdUseCase = this.container.get(
            GetSendCommandByIdUseCase
        );
        const sendCommand = await getSendCommandByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { sendCommand },
        });
    }

    @autobind
    async putSendCommand(req: Request, res: Response) {
        const editSendCommandUseCase = this.container.get(
            EditSendCommandUseCase
        );

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const sendCommand = await editSendCommandUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { sendCommand },
        });
    }
}

export default SendCommandsController;
