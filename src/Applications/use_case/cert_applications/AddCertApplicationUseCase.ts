import { inject, injectable } from 'inversify';
import { AddCertApplicationPayload } from '../../../Commons/types';
import ApprovalRepository from '../../../Domains/approvals/ApprovalRepository';
import BlankApplicationRepository from '../../../Domains/blank_application/BlankApplicationRepository';
import CertApplicationRepository from '../../../Domains/cert_applications/CertApplicationRepository';
import AddedCertApplication from '../../../Domains/cert_applications/entities/CertApplication';
import CertHolderRepository from '../../../Domains/cert_holders/CertHolderRepository';
import CertPurposeRepository from '../../../Domains/cert_purposes/CertPurposeRepository';
import InvoiceDistRepository from '../../../Domains/invoice_dists/InvoceDistRepository';
import PaymentConfirmationRepository from '../../../Domains/payment_confirmations/PaymentConfirmationsRepository';
import ApprovalRepositoryMySql from '../../../Infrastructures/repository/ApprovalRepositoryMySql';
import BlankApplicationRepositoryMySql from '../../../Infrastructures/repository/BlankApplicationRepositoryMySql';
import CertApplicationRepositoryMySql from '../../../Infrastructures/repository/CertApplicationRepositoryMySql';
import CertHolderRepositoryMySql from '../../../Infrastructures/repository/CertHolderRepositoryMySql';
import CertPurposeRepositoryMySql from '../../../Infrastructures/repository/CertPurposeRepositoryMySql';
import InvoiceDistRepositoryMySql from '../../../Infrastructures/repository/InvoiceDistRepositorMySql';
import PaymentConfirmationRepositoryMySql from '../../../Infrastructures/repository/PaymentConfirmationsRepositoryMySql';

@injectable()
class AddCertApplicationUseCase {
    constructor(
        @inject(CertApplicationRepositoryMySql)
        private readonly certApplicationRepository: CertApplicationRepository,
        @inject(ApprovalRepositoryMySql)
        private readonly approvalRepository: ApprovalRepository,
        @inject(CertPurposeRepositoryMySql)
        private readonly certPurposeRepository: CertPurposeRepository,
        @inject(CertHolderRepositoryMySql)
        private readonly certHolderRepository: CertHolderRepository,
        @inject(BlankApplicationRepositoryMySql)
        private readonly blankApplicationRepository: BlankApplicationRepository,
        @inject(InvoiceDistRepositoryMySql)
        private readonly invoiceDistRepository: InvoiceDistRepository,
        @inject(PaymentConfirmationRepositoryMySql)
        private readonly paymentConfirmationRepository: PaymentConfirmationRepository
    ) {}

    async execute(
        payload: AddCertApplicationPayload
    ): Promise<AddedCertApplication> {
        await this.certPurposeRepository.verifyAvailableCertPurpose(
            payload.idCertPurpose
        );
        const { id } = await this.approvalRepository.addApproval(false);
        const result = await this.certApplicationRepository.addCertApplication({
            ...payload,
            idApproval: id,
        });

        if (result.id) {
            await this.certHolderRepository.addCertHolder(result.id);
            await this.blankApplicationRepository.addBlankApplication(
                result.id
            );
            await this.invoiceDistRepository.addInvoiceDist(result.id);
            await this.paymentConfirmationRepository.addPaymentConfirmation(
                result.id
            );
        }

        return result;
    }
}

export default AddCertApplicationUseCase;
