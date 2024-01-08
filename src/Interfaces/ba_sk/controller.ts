import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditBaSkUseCase from '../../Applications/use_case/ba_sk/EditBaSkUseCase';
import GetBaSkByIdUseCase from '../../Applications/use_case/ba_sk/GetBaSkByIdUseCase';
import GetBaSkListUseCase from '../../Applications/use_case/ba_sk/GetBaSkListUseCase';

class BaSksController {
    constructor(private readonly container: Container) {}

    @autobind
    async getBaSkList(req: Request, res: Response) {
        const getBaSkUseCase = this.container.get(GetBaSkListUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const listBaSk = await getBaSkUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { listBaSk },
        });
    }

    @autobind
    async getBaSkById(req: Request, res: Response) {
        const getBaSkByIdUseCase = this.container.get(GetBaSkByIdUseCase);
        const baSk = await getBaSkByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { baSk },
        });
    }

    @autobind
    async putBaSk(req: Request, res: Response) {
        const editBaSkUseCase = this.container.get(EditBaSkUseCase);
        const { id } = req.params;
        const baSk = await editBaSkUseCase.execute(id, req.body);
        res.status(200).json({
            status: 'success',
            data: { baSk },
        });
    }
}

export default BaSksController;
