import CertManager from './entities/CertManager';

interface CertManagerRepository {
    verifyAvailableCertManager(id: string): Promise<void>;
    addCertManager(printBlank: string): Promise<CertManager>;
    getCertManagers(isProcessed: boolean | undefined): Promise<CertManager[]>;
    getCertManagerById(id: string): Promise<CertManager>;
    editCertManager(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertManager>;
    deleteCertManagerByPrintBlankId(printBlank: string): Promise<void>;
}

export default CertManagerRepository;
