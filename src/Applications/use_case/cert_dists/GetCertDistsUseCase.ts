import { inject, injectable } from 'inversify';
import CertDistRepository from '../../../Domains/cert_dists/CertDistRepository';
import CertDist from '../../../Domains/cert_dists/entities/CertDist';
import CertDistRepositoryMySql from '../../../Infrastructures/repository/CertDistRepositoryMySql';

@injectable()
class GetCertDistsUseCase {
    constructor(
        @inject(CertDistRepositoryMySql)
        private readonly certDistRepository: CertDistRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<CertDist[]> {
        return await this.certDistRepository.getCertDists(isProcessed);
    }
}

export default GetCertDistsUseCase;
