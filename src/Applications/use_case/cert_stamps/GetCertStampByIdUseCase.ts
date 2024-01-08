import { inject, injectable } from 'inversify';
import CertStamp from '../../../Domains/cert_stamps/entities/CertStamp';
import CertStampRepositoryMySql from '../../../Infrastructures/repository/CertStampRepositoryMySql';
import CertStampRepository from '../../../Domains/cert_stamps/CertStampRepository';

@injectable()
class GetCertStampByIdUseCase {
    constructor(
        @inject(CertStampRepositoryMySql)
        private readonly certStampRepository: CertStampRepository
    ) {}

    async execute(id: string): Promise<CertStamp> {
        return await this.certStampRepository.getCertStampById(id);
    }
}

export default GetCertStampByIdUseCase;
