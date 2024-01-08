import { inject, injectable } from 'inversify';
import CertManagerRepository from '../../../Domains/cert_managers/CertManagerRepository';
import CertManager from '../../../Domains/cert_managers/entities/CertManager';
import CertManagerRepositoryMySql from '../../../Infrastructures/repository/CertManagerRepositoryMySql';

@injectable()
class GetCertManagerByIdUseCase {
    constructor(
        @inject(CertManagerRepositoryMySql)
        private readonly certManagerRepository: CertManagerRepository
    ) {}

    async execute(id: string): Promise<CertManager> {
        return await this.certManagerRepository.getCertManagerById(id);
    }
}

export default GetCertManagerByIdUseCase;
