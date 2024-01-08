import { inject, injectable } from 'inversify';
import CertManagerRepository from '../../../Domains/cert_managers/CertManagerRepository';
import CertManager from '../../../Domains/cert_managers/entities/CertManager';
import CertManagerRepositoryMySql from '../../../Infrastructures/repository/CertManagerRepositoryMySql';

@injectable()
class EditCertManagerUseCase {
    constructor(
        @inject(CertManagerRepositoryMySql)
        private readonly certManagerRepository: CertManagerRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertManager> {
        await this.certManagerRepository.verifyAvailableCertManager(id);
        const result = await this.certManagerRepository.editCertManager(
            id,
            date,
            isProcessed
        );
        return result;
    }
}

export default EditCertManagerUseCase;
