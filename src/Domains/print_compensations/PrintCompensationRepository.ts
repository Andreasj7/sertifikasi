import PrintCompensation from './entities/PrintCompensation';

interface PrintCompensationRepository {
    verifyAvailablePrintCompensation(id: string): Promise<void>;
    addPrintCompensation(printBlankId: string): Promise<PrintCompensation>;
    getPrintCompensations(
        isProcessed: boolean | undefined
    ): Promise<PrintCompensation[]>;
    getPrintCompensationById(id: string): Promise<PrintCompensation>;
    editPrintCompensation(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PrintCompensation>;
    deletePrintCompensationByPrintBlankId(printBlankId: string): Promise<void>;
}

export default PrintCompensationRepository;
