import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditCardDistUseCase from '../../Applications/use_case/card_dists/EditCardDistUseCase';
import GetCardDistByIdUseCase from '../../Applications/use_case/card_dists/GetCardDistByIdUseCase';
import GetCardDistsUseCase from '../../Applications/use_case/card_dists/GetCardDistsUseCase';

class CardDistsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getCardDists(req: Request, res: Response) {
        const getCardDistsUseCase = this.container.get(GetCardDistsUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const cardDists = await getCardDistsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { cardDists },
        });
    }

    @autobind
    async getCardDistById(req: Request, res: Response) {
        const getCardDistByIdUseCase = this.container.get(
            GetCardDistByIdUseCase
        );
        const cardDist = await getCardDistByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { cardDist },
        });
    }

    @autobind
    async putCardDist(req: Request, res: Response) {
        const editCardDistUseCase = this.container.get(EditCardDistUseCase);

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const cardDist = await editCardDistUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { cardDist },
        });
    }
}

export default CardDistsController;
