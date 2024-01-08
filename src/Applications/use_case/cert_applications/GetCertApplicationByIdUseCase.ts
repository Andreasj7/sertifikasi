import { inject, injectable } from 'inversify';
import CertApplicationRepository from '../../../Domains/cert_applications/CertApplicationRepository';
import CertApplication from '../../../Domains/cert_applications/entities/CertApplication';
import CertApplicationRepositoryMySql from '../../../Infrastructures/repository/CertApplicationRepositoryMySql';

@injectable()
class GetCertApplicationByIdUseCase {
    constructor(
        @inject(CertApplicationRepositoryMySql)
        private readonly certApplicationRepository: CertApplicationRepository
    ) {}

    async execute(id: string): Promise<CertApplication> {
        return await this.certApplicationRepository.getCertApplicationById(id);
    }
}

export default GetCertApplicationByIdUseCase;
