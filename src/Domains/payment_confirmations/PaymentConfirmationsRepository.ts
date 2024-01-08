import PaymentConfirmation from './entities/PaymentConfirmation';

interface PaymentConfirmationRepository {
    verifyAvailablePaymentConfirmation(id: string): Promise<void>;
    addPaymentConfirmation(
        certApplicationId: string
    ): Promise<PaymentConfirmation>;
    getPaymentConfirmations(
        isProcessed: boolean | undefined
    ): Promise<PaymentConfirmation[]>;
    getPaymentConfirmationById(id: string): Promise<PaymentConfirmation>;
    editPaymentConfirmation(
        id: string,
        date: string | undefined,
        fileLocation: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PaymentConfirmation>;
    deletePaymentConfirmationByCertApplicationId(
        certApplicationId: string
    ): Promise<void>;
}

export default PaymentConfirmationRepository;
