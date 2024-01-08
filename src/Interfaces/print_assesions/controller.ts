import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditPrintAssesionUseCase from '../../Applications/use_case/print_assesions/EditPrintAssesionUseCase';
import GetPrintAssesionsUseCase from '../../Applications/use_case/print_assesions/GetPrintAsesionsUseCase';
import GetPrintAssesionByIdUseCase from '../../Applications/use_case/print_assesions/GetPrintAssesionByIdUseCase';

class PrintAssesionsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getPrintAssesions(req: Request, res: Response) {
        const getPrintAssesionsUseCase = this.container.get(
            GetPrintAssesionsUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const printAssesions = await getPrintAssesionsUseCase.execute(
            isProcessed
        );
        res.status(200).json({
            status: 'success',
            data: { printAssesions },
        });
    }

    @autobind
    async getPrintAssesionById(req: Request, res: Response) {
        const getPrintAssesionByIdUseCase = this.container.get(
            GetPrintAssesionByIdUseCase
        );
        const printAssesion = await getPrintAssesionByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { printAssesion },
        });
    }

    @autobind
    async putPrintAssesion(req: Request, res: Response) {
        const editPrintAssesionUseCase = this.container.get(
            EditPrintAssesionUseCase
        );

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const printAssesion = await editPrintAssesionUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { printAssesion },
        });
    }
}

export default PrintAssesionsController;
