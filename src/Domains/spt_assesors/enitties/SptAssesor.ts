import { SptAssesorPayload } from '../../../Commons/types';
import CertApplication from '../../cert_applications/entities/CertApplication';

class SptAssesor {
    public id: string;
    public noSptAssesor: string | null = null;
    public assesorDate: string | null = null;
    public isProcessed: boolean;
    public certApplication?: CertApplication | null;

    constructor(payload: SptAssesorPayload) {
        this.id = payload.id;
        this.noSptAssesor = payload.noSptAssesor;
        this.assesorDate = payload.assesorDate;
        this.isProcessed = payload.isProcessed;
        this.certApplication = payload.certApplication;
    }
}

export default SptAssesor;
