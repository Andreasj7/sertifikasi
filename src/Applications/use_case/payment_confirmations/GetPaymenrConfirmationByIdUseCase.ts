import { inject, injectable } from 'inversify';
import PaymentConfirmationRepository from '../../../Domains/payment_confirmations/PaymentConfirmationsRepository';
import PaymentConfirmation from '../../../Domains/payment_confirmations/entities/PaymentConfirmation';
import PaymentConfirmationRepositoryMySql from '../../../Infrastructures/repository/PaymentConfirmationsRepositoryMySql';

@injectable()
class GetPaymentConfirmationByIdUseCase {
    constructor(
        @inject(PaymentConfirmationRepositoryMySql)
        private readonly paymentConfirmationRepository: PaymentConfirmationRepository
    ) {}

    async execute(id: string): Promise<PaymentConfirmation> {
        return await this.paymentConfirmationRepository.getPaymentConfirmationById(
            id
        );
    }
}

export default GetPaymentConfirmationByIdUseCase;
