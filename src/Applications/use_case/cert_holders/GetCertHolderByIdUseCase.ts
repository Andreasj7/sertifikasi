import { inject, injectable } from 'inversify';
import CertHolderRepository from '../../../Domains/cert_holders/CertHolderRepository';
import CertHolder from '../../../Domains/cert_holders/entities/CertHolder';
import CertHolderRepositoryMySql from '../../../Infrastructures/repository/CertHolderRepositoryMySql';

@injectable()
class GetCertHolderByIdUseCase {
    constructor(
        @inject(CertHolderRepositoryMySql)
        private readonly certHolderRepository: CertHolderRepository
    ) {}

    async execute(id: string): Promise<CertHolder> {
        return await this.certHolderRepository.getCertHolderById(id);
    }
}

export default GetCertHolderByIdUseCase;
