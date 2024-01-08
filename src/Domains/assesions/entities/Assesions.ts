import { AssesionPayload } from '../../../Commons/types';
import AssesmentImpl from '../../assesment_impl/entities/AssesmentImpl';
import Schema from '../../schemas/entities/Schema';

class Assesion {
    public id: string;
    public lspAdmin: string | null;
    public assesorLead: string | null;
    public assesorName: string | null;
    public assesionNumber: number;
    public asesorRecommendation: string | null;
    public date: string | null;
    public isProcessed: boolean;
    public assesmentImpl?: AssesmentImpl | undefined | null = undefined;
    public schema: Schema | null;

    constructor(payload: AssesionPayload) {
        this.id = payload.id;
        this.lspAdmin = payload.lspAdmin;
        this.assesorLead = payload.assesorLead;
        this.assesorName = payload.assesorName;
        this.assesionNumber = payload.assesionNumber;
        this.asesorRecommendation = payload.asesorRecommendation;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.assesmentImpl = payload.assesmentImpl;
        this.schema = payload.schema;
    }
}

export default Assesion;
