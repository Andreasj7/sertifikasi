import { inject, injectable } from 'inversify';
import CertPurposeRepository from '../../../Domains/cert_purposes/CertPurposeRepository';
import CertPurposeRepositoryMySql from '../../../Infrastructures/repository/CertPurposeRepositoryMySql';

@injectable()
class DeleteCertPurposeUseCase {
    constructor(
        @inject(CertPurposeRepositoryMySql)
        private readonly certPurposeRepository: CertPurposeRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.certPurposeRepository.verifyAvailableCertPurpose(id);
        return await this.certPurposeRepository.deleteCertPurpose(id);
    }
}

export default DeleteCertPurposeUseCase;
