import { ReceiptPayload } from '../../../Commons/types';
import CertDist from '../../cert_dists/entities/CertDist';

class Receipt {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public certDist: CertDist | null;

    constructor(payload: ReceiptPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.certDist = payload.certDist;
    }
}

export default Receipt;
