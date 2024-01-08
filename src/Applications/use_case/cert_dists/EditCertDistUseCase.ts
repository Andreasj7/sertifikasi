import { inject, injectable } from 'inversify';
import CertDistRepository from '../../../Domains/cert_dists/CertDistRepository';
import CertDist from '../../../Domains/cert_dists/entities/CertDist';
import ReceiptRepository from '../../../Domains/receipts/ReceiptRepository';
import CertDistRepositoryMySql from '../../../Infrastructures/repository/CertDistRepositoryMySql';
import ReceiptRepositoryMySql from '../../../Infrastructures/repository/ReceiptRepositoryMySql';

@injectable()
class EditCertDistUseCase {
    constructor(
        @inject(CertDistRepositoryMySql)
        private readonly certDistRepository: CertDistRepository,
        @inject(ReceiptRepositoryMySql)
        private readonly receiptRepository: ReceiptRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CertDist> {
        await this.certDistRepository.verifyAvailableCertDist(id);
        const result = await this.certDistRepository.editCertDist(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.receiptRepository.addReceipt(id);
        } else {
            await this.receiptRepository.deleteReceiptByCertDistId(id);
        }
        return result;
    }
}

export default EditCertDistUseCase;
