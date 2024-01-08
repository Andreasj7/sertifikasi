import { BlankApplicationPayload } from '../../../Commons/types';
import CertApplication from '../../cert_applications/entities/CertApplication';

class BlankApplication {
    public id: string;
    public noBlank: string | null;
    public dateBlank: string | null;
    public noHandover: string | null;
    public dateHandover: string | null;
    public blankReceiptDate: string | null;
    public isProcessed: boolean;
    public certApplication?: CertApplication | null;

    constructor(payload: BlankApplicationPayload) {
        this.id = payload.id;
        this.noBlank = payload.noBlank;
        this.dateBlank = payload.dateBlank;
        this.noHandover = payload.noHandover;
        this.dateHandover = payload.dateHandover;
        this.blankReceiptDate = payload.blankReceiptDate;
        this.isProcessed = payload.isProcessed;
        this.certApplication = payload.certApplication;
    }
}

export default BlankApplication;
