import InvoiceDist from './entities/InvoiceDist';

interface InvoiceDistRepository {
    verifyAvailableInvoiceDist(id: string): Promise<void>;
    addInvoiceDist(certApplicationId: string): Promise<InvoiceDist>;
    getInvoiceDists(isProcessed: boolean | undefined): Promise<InvoiceDist[]>;
    getInvoiceDistById(id: string): Promise<InvoiceDist>;
    editInvoiceDist(
        id: string,
        invoiceDate: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<InvoiceDist>;
    deleteInvoiceDistByCertApplicationId(
        certApplicationId: string
    ): Promise<void>;
}

export default InvoiceDistRepository;
