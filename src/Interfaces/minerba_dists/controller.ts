import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditMinerbaDistUseCase from '../../Applications/use_case/minerba_dists/EditMinerbaDistUseCase';
import GetMinerbaDistByIdUseCase from '../../Applications/use_case/minerba_dists/GetMinerbaDistByIdUseCase';
import GetMinerbaDistsUseCase from '../../Applications/use_case/minerba_dists/GetMinerbaDistsUseCase';

class MinerbaDistsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getMinerbaDists(req: Request, res: Response) {
        const getMinerbaDistsUseCase = this.container.get(
            GetMinerbaDistsUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const minerbaDists = await getMinerbaDistsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { minerbaDists },
        });
    }

    @autobind
    async getMinerbaDistById(req: Request, res: Response) {
        const getMinerbaDistByIdUseCase = this.container.get(
            GetMinerbaDistByIdUseCase
        );
        const minerbaDist = await getMinerbaDistByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { minerbaDist },
        });
    }

    @autobind
    async putMinerbaDist(req: Request, res: Response) {
        const editMinerbaDistUseCase = this.container.get(
            EditMinerbaDistUseCase
        );

        const { id } = req.params;
        const { no, date, isProcessed } = req.body;
        const minerbaDist = await editMinerbaDistUseCase.execute(
            id,
            no,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { minerbaDist },
        });
    }
}

export default MinerbaDistsController;
