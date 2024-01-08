import { PurposePayload } from '../../../Commons/types';

class CertPurpose {
    public id: string;
    public purpose: string;

    constructor(payload: PurposePayload) {
        this.id = payload.id;
        this.purpose = payload.purpose;
    }
}

export default CertPurpose;
