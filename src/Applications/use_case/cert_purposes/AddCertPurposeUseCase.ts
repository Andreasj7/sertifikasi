import { inject, injectable } from 'inversify';
import CertPurposeRepository from '../../../Domains/cert_purposes/CertPurposeRepository';
import CertPurpose from '../../../Domains/cert_purposes/entities/CertPuspose';
import CertPurposeRepositoryMySql from '../../../Infrastructures/repository/CertPurposeRepositoryMySql';

@injectable()
class AddCertPurposeUseCase {
    constructor(
        @inject(CertPurposeRepositoryMySql)
        private readonly certPurposeRepository: CertPurposeRepository
    ) {}

    async execute(purpose: string): Promise<CertPurpose> {
        await this.certPurposeRepository.verifyCertPurposeExists(purpose);
        return this.certPurposeRepository.addCertPurpose(purpose);
    }
}

export default AddCertPurposeUseCase;
