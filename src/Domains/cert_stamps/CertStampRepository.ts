import CertStamp from './entities/CertStamp';

interface CertStampRepository {
    verifyAvailableCertStamp(id: string): Promise<void>;
    addCertStamp(printBlank: string): Promise<CertStamp>;
    getCertStamps(isProcessed: boolean | undefined): Promise<CertStamp[]>;
    getCertStampById(id: string): Promise<CertStamp>;
    editCertStamp(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertStamp>;
    deleteCertStampByPrintBlankId(printBlank: string): Promise<void>;
}

export default CertStampRepository;
