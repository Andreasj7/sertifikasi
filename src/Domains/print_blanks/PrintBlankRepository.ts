import PrintBlank from './entities/PrintBlank';

interface PrintBlankRepository {
    verifyAvailablePrintBlank(id: string): Promise<void>;
    addPrintBlank(printAssesionId: string): Promise<PrintBlank>;
    getPrintBlanks(isProcessed: boolean | undefined): Promise<PrintBlank[]>;
    getPrintBlankById(id: string): Promise<PrintBlank>;
    editPrintBlank(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PrintBlank>;
    deletePrintBlankByPrintAssesionId(printAssesionId: string): Promise<void>;
}

export default PrintBlankRepository;
