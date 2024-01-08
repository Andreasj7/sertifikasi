import autobind from 'autobind-decorator';
import { Request, Response } from 'express';
import { Container } from 'inversify';
import EditInvoiceDistUseCase from '../../Applications/use_case/invoice_dists/EditInvoiceDistUseCase';
import GetInvoiceDistByIdUseCase from '../../Applications/use_case/invoice_dists/GetInvoiceDistByIdUseCase';
import GetInvoiceDistsUseCase from '../../Applications/use_case/invoice_dists/GetInvoiceDistsUseCase';

class InvoiceDistsController {
    constructor(private readonly container: Container) {}

    @autobind
    async getInvoiceDists(req: Request, res: Response) {
        const getInvoiceDistsUseCase = this.container.get(
            GetInvoiceDistsUseCase
        );
        const isProcessed =
            req.query.isProcessed !== undefined
                ? req.query.isProcessed === 'true'
                : undefined;
        const invoiceDists = await getInvoiceDistsUseCase.execute(isProcessed);
        res.status(200).json({
            status: 'success',
            data: { invoiceDists },
        });
    }

    @autobind
    async getInvoiceDistById(req: Request, res: Response) {
        const getInvoiceDistByIdUseCase = this.container.get(
            GetInvoiceDistByIdUseCase
        );
        const invoiceDist = await getInvoiceDistByIdUseCase.execute(
            req.params.id
        );
        res.status(200).json({
            status: 'success',
            data: { invoiceDist },
        });
    }

    @autobind
    async putInvoiceDist(req: Request, res: Response) {
        const editInvoiceDistUseCase = this.container.get(
            EditInvoiceDistUseCase
        );

        const { id } = req.params;
        const { invoiceDate, isProcessed } = req.body;
        const invoiceDist = await editInvoiceDistUseCase.execute(
            id,
            invoiceDate,
            isProcessed
        );

        res.status(200).json({
            status: 'success',
            data: { invoiceDist },
        });
    }
}

export default InvoiceDistsController;
