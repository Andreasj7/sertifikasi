import { inject, injectable } from 'inversify';
import CertStorageRepository from '../../../Domains/cert_storages/CertStorageRepository';
import CertStorage from '../../../Domains/cert_storages/entities/CertStorage';
import CertStorageRepositoryMySql from '../../../Infrastructures/repository/CertStorageRepositoryMySql';

@injectable()
class EditCertStorageUseCase {
    constructor(
        @inject(CertStorageRepositoryMySql)
        private readonly certScannerRepository: CertStorageRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertStorage> {
        await this.certScannerRepository.verifyAvailableCertStorage(id);
        const result = await this.certScannerRepository.editCertStorage(
            id,
            date,
            isProcessed
        );
        return result;
    }
}

export default EditCertStorageUseCase;
