import { inject, injectable } from 'inversify';
import CertStorageRepository from '../../../Domains/cert_storages/CertStorageRepository';
import CertStorage from '../../../Domains/cert_storages/entities/CertStorage';
import CertStorageRepositoryMySql from '../../../Infrastructures/repository/CertStorageRepositoryMySql';

@injectable()
class GetCertStorageByIdUseCase {
    constructor(
        @inject(CertStorageRepositoryMySql)
        private readonly certScannerRepository: CertStorageRepository
    ) {}

    async execute(id: string): Promise<CertStorage> {
        return await this.certScannerRepository.getCertStorageById(id);
    }
}

export default GetCertStorageByIdUseCase;
