import { inject, injectable } from 'inversify';
import ReceiptRepository from '../../../Domains/receipts/ReceiptRepository';
import Receipt from '../../../Domains/receipts/entities/Receipt';
import ReceiptRepositoryMySql from '../../../Infrastructures/repository/ReceiptRepositoryMySql';

@injectable()
class GetReceiptByIdUseCase {
    constructor(
        @inject(ReceiptRepositoryMySql)
        private readonly receiptRepository: ReceiptRepository
    ) {}

    async execute(id: string): Promise<Receipt> {
        return await this.receiptRepository.getReceiptById(id);
    }
}

export default GetReceiptByIdUseCase;
