import { inject, injectable } from 'inversify';
import CertApplicationRepository from '../../../Domains/cert_applications/CertApplicationRepository';
import AddedCertApplication from '../../../Domains/cert_applications/entities/CertApplication';
import MinerbaDataRepository from '../../../Domains/minerba_datas/MinerbaDataRepository';
import CertApplicationRepositoryMySql from '../../../Infrastructures/repository/CertApplicationRepositoryMySql';
import MinerbaDataRepositoryMySql from '../../../Infrastructures/repository/MinerbaDataRepositoryMySql';

@injectable()
class EditCertApplicationProcessedUseCase {
    constructor(
        @inject(CertApplicationRepositoryMySql)
        private readonly certApplicationRepository: CertApplicationRepository,
        @inject(MinerbaDataRepositoryMySql)
        private readonly minerbaDataRepository: MinerbaDataRepository
    ) {}

    async execute(
        id: string,
        isProcessed: boolean
    ): Promise<AddedCertApplication> {
        await this.certApplicationRepository.verifyAvailableCertApplication(id);
        const result =
            await this.certApplicationRepository.editCertApplicationProcessed(
                id,
                isProcessed
            );

        if (result.isProcessed) {
            await this.minerbaDataRepository.addMinerbaData(id);
        } else {
            await this.minerbaDataRepository.deleteMinerbaDataByCertApplicationId(
                id
            );
        }
        return result;
    }
}

export default EditCertApplicationProcessedUseCase;
