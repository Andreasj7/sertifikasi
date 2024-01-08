import { inject, injectable } from 'inversify';
import CertDistRepository from '../../../Domains/cert_dists/CertDistRepository';
import CertDist from '../../../Domains/cert_dists/entities/CertDist';
import CertDistRepositoryMySql from '../../../Infrastructures/repository/CertDistRepositoryMySql';

@injectable()
class GetCertDistByIdUseCase {
    constructor(
        @inject(CertDistRepositoryMySql)
        private readonly certDistRepository: CertDistRepository
    ) {}

    async execute(id: string): Promise<CertDist> {
        return await this.certDistRepository.getCertDistById(id);
    }
}

export default GetCertDistByIdUseCase;
