/* istanbul ignore file */
import CertPurpose from './entities/CertPuspose';

interface CertPurposeRepository {
    verifyCertPurposeExists(purpose: string): Promise<void>;
    verifyAvailableCertPurpose(id: string): Promise<void>;
    addCertPurpose(purpose: string): Promise<CertPurpose>;
    getCertPurposes(): Promise<CertPurpose[]>;
    getCertPurposeById(id: string): Promise<CertPurpose>;
    editCertPurpose(
        id: string,
        purpose: string | undefined
    ): Promise<CertPurpose>;
    deleteCertPurpose(id: string): Promise<void>;
}

export default CertPurposeRepository;
