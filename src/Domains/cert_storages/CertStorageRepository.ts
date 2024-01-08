import CertStorage from './entities/CertStorage';

interface CertStorageRepository {
    verifyAvailableCertStorage(id: string): Promise<void>;
    addCertStorage(printBlank: string): Promise<CertStorage>;
    getCertStorages(isProcessed: boolean | undefined): Promise<CertStorage[]>;
    getCertStorageById(id: string): Promise<CertStorage>;
    editCertStorage(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertStorage>;
    deleteCertStorageByPrintBlankId(printBlank: string): Promise<void>;
}

export default CertStorageRepository;
