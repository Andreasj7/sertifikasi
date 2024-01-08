import { inject, injectable } from 'inversify';
import CertApplicationRepository from '../../../Domains/cert_applications/CertApplicationRepository';
import CertApplication from '../../../Domains/cert_applications/entities/CertApplication';
import CertApplicationRepositoryMySql from '../../../Infrastructures/repository/CertApplicationRepositoryMySql';

@injectable()
class GetCertApplicationsUseCase {
    constructor(
        @inject(CertApplicationRepositoryMySql)
        private readonly certApplicationRepository: CertApplicationRepository
    ) {}

    async execute(
        isApproved: boolean | undefined = undefined,
        isProcessed: boolean | undefined = undefined,
        isThreeMonth: boolean | undefined = undefined
    ): Promise<CertApplication[]> {
        return await this.certApplicationRepository.getCertApplications(
            isApproved,
            isProcessed,
            isThreeMonth
        );
    }
}

export default GetCertApplicationsUseCase;
