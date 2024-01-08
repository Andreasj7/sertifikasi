import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditDirecturSignUseCase from '../../Applications/use_case/directur_signs/EditDirecturSignUseCase';
import GetDirecturSignByIdUseCase from '../../Applications/use_case/directur_signs/GetDirecturSignByIdUseCase';
import GetDirecturSignsUseCase from '../../Applications/use_case/directur_signs/GetDirecturSignsUseCase';

class DirecturSignsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getDirecturSigns(req: Request, res: Response) {
        const getDirecturSignsUseCase = this.container.get(
            GetDirecturSignsUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const directurSigns = await getDirecturSignsUseCase.execute(
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            data: { directurSigns },
        });
    }

    @autobind
    async getDirecturSignById(req: Request, res: Response) {
        const getDirecturSignByIdUseCase = this.container.get(
            GetDirecturSignByIdUseCase
        );
        const directurSign = await getDirecturSignByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { directurSign },
        });
    }

    @autobind
    async putDirecturSign(req: Request, res: Response) {
        const editDirecturSignUseCase = this.container.get(
            EditDirecturSignUseCase
        );

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const directurSign = await editDirecturSignUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { directurSign },
        });
    }
}

export default DirecturSignsController;
