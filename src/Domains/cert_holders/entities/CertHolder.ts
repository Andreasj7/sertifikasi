import {
    CertApplicationPayload,
    CertHolderPayload,
} from '../../../Commons/types';

class CertHolder {
    public id: string;
    public certHolder: string | null;
    public isProcessed: boolean;
    public certApplication?: CertApplicationPayload | null;

    constructor(payload: CertHolderPayload) {
        this.id = payload.id;
        this.certHolder = payload.certHolder;
        this.isProcessed = payload.isProcessed;
        this.certApplication = payload.certApplication;
    }
}

export default CertHolder;
