import CertDist from './entities/CertDist';

interface CertDistRepository {
    verifyAvailableCertDist(id: string): Promise<void>;
    addCertDist(cardDistId: string): Promise<CertDist>;
    getCertDists(isProcessed: boolean | undefined): Promise<CertDist[]>;
    getCertDistById(id: string): Promise<CertDist>;
    editCertDist(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertDist>;
    deleteCertDistByCardDistId(cardDistId: string): Promise<void>;
}

export default CertDistRepository;
