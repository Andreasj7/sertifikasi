import { inject, injectable } from 'inversify';
import CertScannerRepository from '../../../Domains/cert_scanners/CertScannerRepository';
import CertScanner from '../../../Domains/cert_scanners/entities/CertScanner';
import CertScannerRepositoryMySql from '../../../Infrastructures/repository/CertScannerRepositoryMySql';

@injectable()
class GetCertScannerByIdUseCase {
    constructor(
        @inject(CertScannerRepositoryMySql)
        private readonly certScannerRepository: CertScannerRepository
    ) {}

    async execute(id: string): Promise<CertScanner> {
        return await this.certScannerRepository.getCertScannerById(id);
    }
}

export default GetCertScannerByIdUseCase;
