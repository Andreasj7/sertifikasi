import CertHolder from './entities/CertHolder';

interface CertHolderRepository {
    verifyAvailableCertHolder(id: string): Promise<void>;
    addCertHolder(certApplicationId: string): Promise<CertHolder>;
    getCertHolders(isProcessed: boolean | undefined): Promise<CertHolder[]>;
    getCertHolderById(id: string): Promise<CertHolder>;
    editCertHolder(
        id: string,
        certHolder: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertHolder>;
    deleteCertHolderBycertApplicationId(
        certApplicationId: string
    ): Promise<void>;
}

export default CertHolderRepository;
