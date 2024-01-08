import CertManager from '../cert_managers/entities/CertManager';

interface CertManagerRepository {
    verifyAvailableCertManager(id: string): Promise<void>;
    addCertManager(directurSignId: string): Promise<CertManager>;
    getCertManagers(isProcessed: boolean | undefined): Promise<CertManager[]>;
    getCertManagerById(id: string): Promise<CertManager>;
    editCertManager(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertManager>;
    deleteCertManagerByDirecturSignId(directurSignId: string): Promise<void>;
}

export default CertManagerRepository;
