import CertScanner from './entities/CertScanner';

interface CertScannerRepository {
    verifyAvailableCertScanner(id: string): Promise<void>;
    addCertScanner(printBlankId: string): Promise<CertScanner>;
    getCertScanners(isProcessed: boolean | undefined): Promise<CertScanner[]>;
    getCertScannerById(id: string): Promise<CertScanner>;
    editCertScanner(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertScanner>;
    deleteCertScannerByPrintBlankId(printBlankId: string): Promise<void>;
}

export default CertScannerRepository;
