import { MinerbaDataPayload } from '../../../Commons/types';
import CertApplication from '../../cert_applications/entities/CertApplication';

class MinerbaData {
    public id: string;
    public no: string | null;
    public date: string | null;
    public isProcessed: boolean;
    public certApplication?: CertApplication | null;

    constructor(payload: MinerbaDataPayload) {
        this.id = payload.id;
        this.no = payload.no;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.certApplication = payload.certApplication;
    }
}

export default MinerbaData;
