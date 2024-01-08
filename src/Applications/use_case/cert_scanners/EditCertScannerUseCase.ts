import { inject, injectable } from 'inversify';
import CertScannerRepository from '../../../Domains/cert_scanners/CertScannerRepository';
import CertScanner from '../../../Domains/cert_scanners/entities/CertScanner';
import CertScannerRepositoryMySql from '../../../Infrastructures/repository/CertScannerRepositoryMySql';

@injectable()
class EditCertScannerUseCase {
    constructor(
        @inject(CertScannerRepositoryMySql)
        private readonly certScannerRepository: CertScannerRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertScanner> {
        await this.certScannerRepository.verifyAvailableCertScanner(id);
        const result = await this.certScannerRepository.editCertScanner(
            id,
            date,
            isProcessed
        );
        return result;
    }
}

export default EditCertScannerUseCase;
