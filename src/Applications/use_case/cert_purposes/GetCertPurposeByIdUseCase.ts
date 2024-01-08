import { inject, injectable } from 'inversify';
import CertPurposeRepository from '../../../Domains/cert_purposes/CertPurposeRepository';
import CertPurpose from '../../../Domains/cert_purposes/entities/CertPuspose';
import CertPurposeRepositoryMySql from '../../../Infrastructures/repository/CertPurposeRepositoryMySql';

@injectable()
class GetCertPurposeByIdUseCase {
    constructor(
        @inject(CertPurposeRepositoryMySql)
        private readonly certPurposeRepository: CertPurposeRepository
    ) {}

    async execute(id: string): Promise<CertPurpose> {
        return await this.certPurposeRepository.getCertPurposeById(id);
    }
}

export default GetCertPurposeByIdUseCase;
