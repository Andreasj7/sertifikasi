import { inject, injectable } from 'inversify';
import PaymentConfirmationRepository from '../../../Domains/payment_confirmations/PaymentConfirmationsRepository';
import PaymentConfirmation from '../../../Domains/payment_confirmations/entities/PaymentConfirmation';
import PaymentConfirmationRepositoryMySql from '../../../Infrastructures/repository/PaymentConfirmationsRepositoryMySql';

@injectable()
class EditPaymentConfirmationUseCase {
    constructor(
        @inject(PaymentConfirmationRepositoryMySql)
        private readonly paymentConfirmationRepository: PaymentConfirmationRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        fileLocation: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PaymentConfirmation> {
        await this.paymentConfirmationRepository.verifyAvailablePaymentConfirmation(
            id
        );
        const result =
            await this.paymentConfirmationRepository.editPaymentConfirmation(
                id,
                date,
                fileLocation,
                isProcessed
            );
        return result;
    }
}

export default EditPaymentConfirmationUseCase;
