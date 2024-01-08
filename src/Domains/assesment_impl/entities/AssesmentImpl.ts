import { AssesionPayload, AssesmentImplPayload } from '../../../Commons/types';
import SptAssesor from '../../spt_assesors/enitties/SptAssesor';

class AssesmentImpl {
    public id: string;
    public isProcessed: boolean;
    public sptAssesor: SptAssesor;
    public assesions?: AssesionPayload[] | null;

    constructor(payload: AssesmentImplPayload) {
        this.id = payload.id;
        this.isProcessed = payload.isProcessed;
        this.sptAssesor = payload.sptAssesor;
        this.assesions = payload.assesions;
    }
}

export default AssesmentImpl;
