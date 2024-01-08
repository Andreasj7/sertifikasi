import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditPrintCompensationUseCase from '../../Applications/use_case/print_compensations/EditPrintCompensationUseCase';
import GetPrintCompensationByIdUseCase from '../../Applications/use_case/print_compensations/GetPrinCompensationByIdUseCase';
import GetPrintCompensationsUseCase from '../../Applications/use_case/print_compensations/GetPrintCompensationsUseCase';

class PrintCompensationsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getPrintCompensations(req: Request, res: Response) {
        const getPrintCompensationsUseCase = this.container.get(
            GetPrintCompensationsUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const printCompensations = await getPrintCompensationsUseCase.execute(
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            data: { printCompensations },
        });
    }

    @autobind
    async getPrintCompensationById(req: Request, res: Response) {
        const getPrintCompensationByIdUseCase = this.container.get(
            GetPrintCompensationByIdUseCase
        );
        const printCompensation = await getPrintCompensationByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { printCompensation },
        });
    }

    @autobind
    async putPrintCompensation(req: Request, res: Response) {
        const editPrintCompensationUseCase = this.container.get(
            EditPrintCompensationUseCase
        );

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const printCompensation = await editPrintCompensationUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { printCompensation },
        });
    }
}

export default PrintCompensationsController;
