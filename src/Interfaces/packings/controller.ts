import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditPackingUseCase from '../../Applications/use_case/packings/EditPackingUseCase';
import GetPackingByIdUseCase from '../../Applications/use_case/packings/GetPackingByIdUseCase';
import GetPackingsUseCase from '../../Applications/use_case/packings/GetPackingsUseCase';

class PackingsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getPackings(req: Request, res: Response) {
        const getPackingsUseCase = this.container.get(GetPackingsUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const packings = await getPackingsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { packings },
        });
    }

    @autobind
    async getPackingById(req: Request, res: Response) {
        const getPackingByIdUseCase = this.container.get(GetPackingByIdUseCase);
        const packing = await getPackingByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { packing },
        });
    }

    @autobind
    async putPacking(req: Request, res: Response) {
        const editPackingUseCase = this.container.get(EditPackingUseCase);

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const packing = await editPackingUseCase.execute(id, date, isProcessed);

        res.status(200).json({
            status: 'success',
            data: { packing },
        });
    }
}

export default PackingsController;
