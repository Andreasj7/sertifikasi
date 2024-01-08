import PrintAssesion from './entities/PrintAssesion';

interface PrintAssesionRepository {
    verifyAvailablePrintAssesion(id: string): Promise<void>;
    addPrintAssesion(testResultId: string): Promise<PrintAssesion>;
    getPrintAssesions(
        isProcessed: boolean | undefined
    ): Promise<PrintAssesion[]>;
    getPrintAssesionById(id: string): Promise<PrintAssesion>;
    editPrintAssesion(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PrintAssesion>;
    deletePrintAssesionByTestResultId(testResultId: string): Promise<void>;
}

export default PrintAssesionRepository;
