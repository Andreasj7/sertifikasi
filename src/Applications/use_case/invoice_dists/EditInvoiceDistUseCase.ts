import { inject, injectable } from 'inversify';
import InvoiceDistRepository from '../../../Domains/invoice_dists/InvoceDistRepository';
import InvoiceDist from '../../../Domains/invoice_dists/entities/InvoiceDist';
import InvoiceDistRepositoryMySql from '../../../Infrastructures/repository/InvoiceDistRepositorMySql';

@injectable()
class EditInvoiceDistUseCase {
    constructor(
        @inject(InvoiceDistRepositoryMySql)
        private readonly invoiceDateRepository: InvoiceDistRepository
    ) {}

    async execute(
        id: string,
        invoiceDate: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<InvoiceDist> {
        await this.invoiceDateRepository.verifyAvailableInvoiceDist(id);
        const result = await this.invoiceDateRepository.editInvoiceDist(
            id,
            invoiceDate,
            isProcessed
        );

        // if (result.isProcessed) {
        //     await this.invoiceDateRepository.addInvoiceDist(id);
        // } else {
        //     await this.invoiceDateRepository.deleteInvoiceDistByBaSkId(id);
        // }
        return result;
    }
}

export default EditInvoiceDistUseCase;
