import { inject, injectable } from 'inversify';
import CertScannerRepository from '../../../Domains/cert_scanners/CertScannerRepository';
import CertScanner from '../../../Domains/cert_scanners/entities/CertScanner';
import CertScannerRepositoryMySql from '../../../Infrastructures/repository/CertScannerRepositoryMySql';

@injectable()
class GetCertScannersUseCase {
    constructor(
        @inject(CertScannerRepositoryMySql)
        private readonly certScannerRepository: CertScannerRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<CertScanner[]> {
        return await this.certScannerRepository.getCertScanners(isProcessed);
    }
}

export default GetCertScannersUseCase;
