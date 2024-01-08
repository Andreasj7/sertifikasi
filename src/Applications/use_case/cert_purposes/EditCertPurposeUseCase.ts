import { inject, injectable } from 'inversify';
import CertPurposeRepository from '../../../Domains/cert_purposes/CertPurposeRepository';
import CertPurpose from '../../../Domains/cert_purposes/entities/CertPuspose';
import CertPurposeRepositoryMySql from '../../../Infrastructures/repository/CertPurposeRepositoryMySql';

@injectable()
class EditCertPurposeUseCase {
    constructor(
        @inject(CertPurposeRepositoryMySql)
        private readonly certPurposeRepository: CertPurposeRepository
    ) {}

    async execute(id: string, purpose: string): Promise<CertPurpose> {
        await this.certPurposeRepository.verifyAvailableCertPurpose(id);
        return this.certPurposeRepository.editCertPurpose(id, purpose);
    }
}

export default EditCertPurposeUseCase;
