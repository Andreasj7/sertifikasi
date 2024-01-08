import { PaymentConfirmationPayload } from '../../../Commons/types';
import CertApplication from '../../cert_applications/entities/CertApplication';

class PaymentConfirmation {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public proofUrl: string | null;
    public certApplication?: CertApplication | null;

    constructor(payload: PaymentConfirmationPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.proofUrl = payload.proofUrl;
        this.certApplication = payload.certApplication;
    }
}

export default PaymentConfirmation;
