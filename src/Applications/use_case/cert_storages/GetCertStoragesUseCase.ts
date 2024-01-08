import { inject, injectable } from 'inversify';
import CertStorageRepository from '../../../Domains/cert_storages/CertStorageRepository';
import CertStorage from '../../../Domains/cert_storages/entities/CertStorage';
import CertStorageRepositoryMySql from '../../../Infrastructures/repository/CertStorageRepositoryMySql';

@injectable()
class GetCertStoragesUseCase {
    constructor(
        @inject(CertStorageRepositoryMySql)
        private readonly certScannerRepository: CertStorageRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<CertStorage[]> {
        return await this.certScannerRepository.getCertStorages(isProcessed);
    }
}

export default GetCertStoragesUseCase;
