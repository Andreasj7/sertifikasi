import { NewAssesmentImplPayload } from '../../Commons/types';
import Assesion from './entities/Assesions';

interface AssesionRepository {
    verifyAvailableAssesion(id: string): Promise<void>;
    addAssesion(
        assesmentImplId: string,
        payload: NewAssesmentImplPayload
    ): Promise<Assesion>;
    getAssesions(isProcessed: boolean | undefined): Promise<Assesion[]>;
    getAssesionById(id: string): Promise<Assesion>;
    editAssesion(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<Assesion>;
    deleteAssesionByAssesmentImplId(assesmentImplId: string): Promise<void>;
}

export default AssesionRepository;
