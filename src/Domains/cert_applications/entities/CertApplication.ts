import { CertApplicationPayload } from '../../../Commons/types';
import Approval from '../../approvals/entities/Approval';
import BlankApplication from '../../blank_application/entities/BlankApplication';
import CertHolder from '../../cert_holders/entities/CertHolder';
import CertPurpose from '../../cert_purposes/entities/CertPuspose';
import InvoiceDist from '../../invoice_dists/entities/InvoiceDist';
import MinerbaData from '../../minerba_datas/entities/MinerbaData';
import PaymentConfirmation from '../../payment_confirmations/entities/PaymentConfirmation';
import SptAssesor from '../../spt_assesors/enitties/SptAssesor';

class CertApplication {
    public id: string;
    public tukName: string;
    public assesmentDate: string;
    public referenceNumber: string;
    public receiptDate: string;
    public certPurpose: CertPurpose;
    public isProcessed: boolean;
    public approval: Approval;
    public sptAssesor?: SptAssesor | null;
    public certHolder?: CertHolder | null;
    public blankApplication?: BlankApplication | null;
    public invoiceDist?: InvoiceDist | null;
    public paymentConfirmation?: PaymentConfirmation | null;
    public minerbaData?: MinerbaData | null;

    constructor(payload: CertApplicationPayload) {
        this.id = payload.id;
        this.tukName = payload.tukName;
        this.assesmentDate = payload.assesmentDate;
        this.referenceNumber = payload.referenceNumber;
        this.receiptDate = payload.receiptDate;
        this.certPurpose = payload.certPurpose;
        this.isProcessed = payload.isProcessed;
        this.approval = payload.approval;
        this.sptAssesor = payload.sptAssesor;
        this.certHolder = payload.certHolder;
        this.blankApplication = payload.blankApplication;
        this.invoiceDist = payload.invoiceDist;
        this.paymentConfirmation = payload.paymentConfirmation;
        this.minerbaData = payload.minerbaData;
    }
}

export default CertApplication;
