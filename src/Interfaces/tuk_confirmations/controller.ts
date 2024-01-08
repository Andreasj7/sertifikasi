import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditTukConfirmationUseCase from '../../Applications/use_case/tuk_confirmations/EditTukConfirmationUseCase';
import GetTukConfirmationByIdUseCase from '../../Applications/use_case/tuk_confirmations/GetTukConfirmationByIdUseCase';
import GetTukConfirmationsUseCase from '../../Applications/use_case/tuk_confirmations/GetTukConfirmationsUseCase';

class TukConfirmationsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getTukConfirmations(req: Request, res: Response) {
        const getTukConfirmationsUseCase = this.container.get(
            GetTukConfirmationsUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const tukConfirmations = await getTukConfirmationsUseCase.execute(
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            data: { tukConfirmations },
        });
    }

    @autobind
    async getTukConfirmationById(req: Request, res: Response) {
        const getTukConfirmationByIdUseCase = this.container.get(
            GetTukConfirmationByIdUseCase
        );
        const tukConfirmation = await getTukConfirmationByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { tukConfirmation },
        });
    }

    @autobind
    async putTukConfirmation(req: Request, res: Response) {
        const editTukConfirmationUseCase = this.container.get(
            EditTukConfirmationUseCase
        );

        const { id } = req.params;
        const { date, description, isProcessed } = req.body;
        const tukConfirmation = await editTukConfirmationUseCase.execute(
            id,
            date,
            description,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { tukConfirmation },
        });
    }
}

export default TukConfirmationsController;
