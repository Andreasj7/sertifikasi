import { inject, injectable } from 'inversify';
import CertHolderRepository from '../../../Domains/cert_holders/CertHolderRepository';
import CertHolder from '../../../Domains/cert_holders/entities/CertHolder';
import CertHolderRepositoryMySql from '../../../Infrastructures/repository/CertHolderRepositoryMySql';

@injectable()
class GetCertHoldersUseCase {
    constructor(
        @inject(CertHolderRepositoryMySql)
        private readonly certHolderRepository: CertHolderRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<CertHolder[]> {
        return await this.certHolderRepository.getCertHolders(isProcessed);
    }
}

export default GetCertHoldersUseCase;
