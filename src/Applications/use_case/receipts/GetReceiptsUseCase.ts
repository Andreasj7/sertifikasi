import { inject, injectable } from 'inversify';
import ReceiptRepository from '../../../Domains/receipts/ReceiptRepository';
import Receipt from '../../../Domains/receipts/entities/Receipt';
import ReceiptRepositoryMySql from '../../../Infrastructures/repository/ReceiptRepositoryMySql';

@injectable()
class GetReceiptsUseCase {
    constructor(
        @inject(ReceiptRepositoryMySql)
        private readonly receiptRepository: ReceiptRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<Receipt[]> {
        return await this.receiptRepository.getReceipts(isProcessed);
    }
}

export default GetReceiptsUseCase;
