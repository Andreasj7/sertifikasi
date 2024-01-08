import TukConfirmation from './entities/TukConfirmation';

interface TukConfirmationRepository {
    verifyAvailableTukConfirmation(id: string): Promise<void>;
    addTukConfirmation(receiptId: string): Promise<TukConfirmation>;
    getTukConfirmations(
        isProcessed: boolean | undefined
    ): Promise<TukConfirmation[]>;
    getTukConfirmationById(id: string): Promise<TukConfirmation>;
    editTukConfirmation(
        id: string,
        date: string | undefined,
        description: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<TukConfirmation>;
    deleteTukConfirmationByReceiptId(receiptId: string): Promise<void>;
}

export default TukConfirmationRepository;
