import { inject, injectable } from 'inversify';
import InvoiceDistRepository from '../../../Domains/invoice_dists/InvoceDistRepository';
import InvoiceDist from '../../../Domains/invoice_dists/entities/InvoiceDist';
import InvoiceDistRepositoryMySql from '../../../Infrastructures/repository/InvoiceDistRepositorMySql';

@injectable()
class GetInvoiceDistsUseCase {
    constructor(
        @inject(InvoiceDistRepositoryMySql)
        private readonly invoiceDistRepository: InvoiceDistRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<InvoiceDist[]> {
        return await this.invoiceDistRepository.getInvoiceDists(isProcessed);
    }
}

export default GetInvoiceDistsUseCase;
