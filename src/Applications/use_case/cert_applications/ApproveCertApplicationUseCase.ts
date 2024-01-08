import { inject, injectable } from 'inversify';
import CertApplicationRepository from '../../../Domains/cert_applications/CertApplicationRepository';
import AddedCertApplication from '../../../Domains/cert_applications/entities/CertApplication';
import SptAssesorRepository from '../../../Domains/spt_assesors/SptAssesorRepository';
import CertApplicationRepositoryMySql from '../../../Infrastructures/repository/CertApplicationRepositoryMySql';
import SptAssesorRepositoryMySql from '../../../Infrastructures/repository/SptAssesorRepositoryMySql';

@injectable()
class ApproveCertApplicationUseCase {
    constructor(
        @inject(CertApplicationRepositoryMySql)
        private readonly certApplicationRepository: CertApplicationRepository,
        @inject(SptAssesorRepositoryMySql)
        private readonly sptAssesorRepository: SptAssesorRepository
    ) {}

    async execute(
        id: string,
        isApproved: boolean
    ): Promise<AddedCertApplication> {
        await this.certApplicationRepository.verifyAvailableCertApplication(id);

        const result =
            await this.certApplicationRepository.approveCertApplication(
                id,
                isApproved
            );

        if (result.approval.isApproved) {
            await this.sptAssesorRepository.addSptAssesor(id);
        } else {
            await this.sptAssesorRepository.deleteSptAssesorByCertApplicatonId(
                id
            );
        }
        return result;
    }
}

export default ApproveCertApplicationUseCase;
