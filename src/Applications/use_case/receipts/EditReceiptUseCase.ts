import { inject, injectable } from 'inversify';
import ReceiptRepository from '../../../Domains/receipts/ReceiptRepository';
import Receipt from '../../../Domains/receipts/entities/Receipt';
import TukConfirmationRepository from '../../../Domains/tuk_confirmations/TukConfirmationRepository';
import ReceiptRepositoryMySql from '../../../Infrastructures/repository/ReceiptRepositoryMySql';
import TukConfirmationRepositoryMySql from '../../../Infrastructures/repository/TukConfirmationRepositoryMySql';

@injectable()
class EditReceiptUseCase {
    constructor(
        @inject(ReceiptRepositoryMySql)
        private readonly receiptRepository: ReceiptRepository,
        @inject(TukConfirmationRepositoryMySql)
        private readonly tukConfirmationRepository: TukConfirmationRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<Receipt> {
        await this.receiptRepository.verifyAvailableReceipt(id);
        const result = await this.receiptRepository.editReceipt(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.tukConfirmationRepository.addTukConfirmation(id);
        } else {
            await this.tukConfirmationRepository.deleteTukConfirmationByReceiptId(
                id
            );
        }
        return result;
    }
}

export default EditReceiptUseCase;
