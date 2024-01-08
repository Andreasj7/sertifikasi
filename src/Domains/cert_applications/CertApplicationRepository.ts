/* istanbul ignore file */
import { NewCertApplicationPayload } from '../../Commons/types';
import CertApplication from './entities/CertApplication';

interface CertApplicationRepository {
    verifyAvailableCertApplication(id: string): Promise<void>;
    getCertApplications(
        isApproved: boolean | undefined,
        isProcessed: boolean | undefined,
        isThreeMonth: boolean | undefined
    ): Promise<CertApplication[]>;
    getCertApplicationById(id: string): Promise<CertApplication>;
    addCertApplication(
        payload: NewCertApplicationPayload
    ): Promise<CertApplication>;
    approveCertApplication(
        id: string,
        isApproved: boolean
    ): Promise<CertApplication>;
    editCertApplicationProcessed(
        id: string,
        isProcessed: boolean | undefined
    ): Promise<CertApplication>;
}

export default CertApplicationRepository;
