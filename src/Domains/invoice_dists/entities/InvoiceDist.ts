import { InvoiceDistPayload } from '../../../Commons/types';
import CertApplication from '../../cert_applications/entities/CertApplication';

class InvoiceDist {
    public id: string;
    public invoiceDate: string | null;
    public isProcessed: boolean;
    public certApplication?: CertApplication | null;

    constructor(payload: InvoiceDistPayload) {
        this.id = payload.id;
        this.invoiceDate = payload.invoiceDate;
        this.isProcessed = payload.isProcessed;
        this.certApplication = payload.certApplication;
    }
}

export default InvoiceDist;
