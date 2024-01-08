import { inject, injectable } from 'inversify';
import CertPurposeRepository from '../../../Domains/cert_purposes/CertPurposeRepository';
import CertPurpose from '../../../Domains/cert_purposes/entities/CertPuspose';
import CertPurposeRepositoryMySql from '../../../Infrastructures/repository/CertPurposeRepositoryMySql';

@injectable()
class GetCertPurposesUseCase {
    constructor(
        @inject(CertPurposeRepositoryMySql)
        private readonly certPurposeRepository: CertPurposeRepository
    ) {}

    async execute(): Promise<CertPurpose[]> {
        return await this.certPurposeRepository.getCertPurposes();
    }
}

export default GetCertPurposesUseCase;
