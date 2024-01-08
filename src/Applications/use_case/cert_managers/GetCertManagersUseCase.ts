import { inject, injectable } from 'inversify';
import CertManagerRepository from '../../../Domains/cert_managers/CertManagerRepository';
import CertManager from '../../../Domains/cert_managers/entities/CertManager';
import CertManagerRepositoryMySql from '../../../Infrastructures/repository/CertManagerRepositoryMySql';

@injectable()
class GetCertManagersUseCase {
    constructor(
        @inject(CertManagerRepositoryMySql)
        private readonly certManagerRepository: CertManagerRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<CertManager[]> {
        return await this.certManagerRepository.getCertManagers(isProcessed);
    }
}

export default GetCertManagersUseCase;
