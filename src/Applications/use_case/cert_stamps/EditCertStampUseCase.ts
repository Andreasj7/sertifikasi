import { inject, injectable } from 'inversify';
import CertStampRepository from '../../../Domains/cert_stamps/CertStampRepository';
import CertStamp from '../../../Domains/cert_stamps/entities/CertStamp';
import CertStampRepositoryMySql from '../../../Infrastructures/repository/CertStampRepositoryMySql';

@injectable()
class EditCertStampUseCase {
    constructor(
        @inject(CertStampRepositoryMySql)
        private readonly certStampRepository: CertStampRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertStamp> {
        await this.certStampRepository.verifyAvailableCertStamp(id);
        const result = await this.certStampRepository.editCertStamp(
            id,
            date,
            isProcessed
        );
        return result;
    }
}

export default EditCertStampUseCase;
