import { inject, injectable } from 'inversify';
import CertStampRepository from '../../../Domains/cert_stamps/CertStampRepository';
import CertStamp from '../../../Domains/cert_stamps/entities/CertStamp';
import CertStampRepositoryMySql from '../../../Infrastructures/repository/CertStampRepositoryMySql';

@injectable()
class GetCertStampsUseCase {
    constructor(
        @inject(CertStampRepositoryMySql)
        private readonly certStampRepository: CertStampRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<CertStamp[]> {
        return await this.certStampRepository.getCertStamps(isProcessed);
    }
}

export default GetCertStampsUseCase;
