import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditReceiptUseCase from '../../Applications/use_case/receipts/EditReceiptUseCase';
import GetReceiptByIdUseCase from '../../Applications/use_case/receipts/GetReceiptByIdUseCase';
import GetReceiptsUseCase from '../../Applications/use_case/receipts/GetReceiptsUseCase';

class ReceiptsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getReceipts(req: Request, res: Response) {
        const getReceiptsUseCase = this.container.get(GetReceiptsUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const receipts = await getReceiptsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { receipts },
        });
    }

    @autobind
    async getReceiptById(req: Request, res: Response) {
        const getReceiptByIdUseCase = this.container.get(GetReceiptByIdUseCase);
        const receipt = await getReceiptByIdUseCase.execute(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { receipt },
        });
    }

    @autobind
    async putReceipt(req: Request, res: Response) {
        const editReceiptUseCase = this.container.get(EditReceiptUseCase);

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const receipt = await editReceiptUseCase.execute(id, date, isProcessed);

        res.status(200).json({
            status: 'success',
            data: { receipt },
        });
    }
}

export default ReceiptsController;
