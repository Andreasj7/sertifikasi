import { inject, injectable } from 'inversify';
import CertHolderRepository from '../../../Domains/cert_holders/CertHolderRepository';
import CertHolder from '../../../Domains/cert_holders/entities/CertHolder';
import CertHolderRepositoryMySql from '../../../Infrastructures/repository/CertHolderRepositoryMySql';

@injectable()
class EditCertHolderUseCase {
    constructor(
        @inject(CertHolderRepositoryMySql)
        private readonly certHolderRepository: CertHolderRepository
    ) {}

    async execute(
        id: string,
        certHolder: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertHolder> {
        await this.certHolderRepository.verifyAvailableCertHolder(id);
        return await this.certHolderRepository.editCertHolder(
            id,
            certHolder,
            isProcessed
        );
    }
}

export default EditCertHolderUseCase;
