import Receipt from './entities/Receipt';

interface ReceiptRepository {
    verifyAvailableReceipt(id: string): Promise<void>;
    addReceipt(certDistId: string): Promise<Receipt>;
    getReceipts(isProcessed: boolean | undefined): Promise<Receipt[]>;
    getReceiptById(id: string): Promise<Receipt>;
    editReceipt(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<Receipt>;
    deleteReceiptByCertDistId(certDistId: string): Promise<void>;
}

export default ReceiptRepository;
