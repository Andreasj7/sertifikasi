import { inject, injectable } from 'inversify';
import InvoiceDistRepository from '../../../Domains/invoice_dists/InvoceDistRepository';
import InvoiceDist from '../../../Domains/invoice_dists/entities/InvoiceDist';
import InvoiceDistRepositoryMySql from '../../../Infrastructures/repository/InvoiceDistRepositorMySql';

@injectable()
class GetInvoiceDistByIdUseCase {
    constructor(
        @inject(InvoiceDistRepositoryMySql)
        private readonly invoiceDistRepository: InvoiceDistRepository
    ) {}

    async execute(id: string): Promise<InvoiceDist> {
        return await this.invoiceDistRepository.getInvoiceDistById(id);
    }
}

export default GetInvoiceDistByIdUseCase;
