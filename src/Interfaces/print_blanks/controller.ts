import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditPrintBlankUseCase from '../../Applications/use_case/print_blanks/EditPrintBlankUseCase';
import GetPrintBlankByIdUseCase from '../../Applications/use_case/print_blanks/GetPrintBlankByIdUseCase';
import GetPrintBlanksUseCase from '../../Applications/use_case/print_blanks/GetPrintBlanksUseCase';

class PrintBlanksController {
    constructor(private readonly container: Container) {}

    @autobind
    async getPrintBlanks(req: Request, res: Response) {
        const getPrintBlanksUseCase = this.container.get(GetPrintBlanksUseCase);
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const printBlanks = await getPrintBlanksUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { printBlanks },
        });
    }

    @autobind
    async getPrintBlankById(req: Request, res: Response) {
        const getPrintBlankByIdUseCase = this.container.get(
            GetPrintBlankByIdUseCase
        );
        const printBlank = await getPrintBlankByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { printBlank },
        });
    }

    @autobind
    async putPrintBlank(req: Request, res: Response) {
        const editPrintBlankUseCase = this.container.get(EditPrintBlankUseCase);

        const { id } = req.params;
        const { date, isProcessed } = req.body;
        const printBlank = await editPrintBlankUseCase.execute(
            id,
            date,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { printBlank },
        });
    }
}

export default PrintBlanksController;
