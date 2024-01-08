import { inject, injectable } from 'inversify';
import PaymentConfirmationRepository from '../../../Domains/payment_confirmations/PaymentConfirmationsRepository';
import PaymentConfirmation from '../../../Domains/payment_confirmations/entities/PaymentConfirmation';
import PaymentConfirmationRepositoryMySql from '../../../Infrastructures/repository/PaymentConfirmationsRepositoryMySql';

@injectable()
class GetPaymentConfirmationsUseCase {
    constructor(
        @inject(PaymentConfirmationRepositoryMySql)
        private readonly paymentConfirmationRepository: PaymentConfirmationRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<PaymentConfirmation[]> {
        return await this.paymentConfirmationRepository.getPaymentConfirmations(
            isProcessed
        );
    }
}

export default GetPaymentConfirmationsUseCase;
