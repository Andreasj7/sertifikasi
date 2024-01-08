import { NewBaSkPayload } from '../../Commons/types';
import BaSk from './entities/BaSk';

interface BaSkRepository {
    verifyAvailableBaSk(id: string): Promise<void>;
    addBaSk(assesmentScheduleId: string): Promise<BaSk>;
    getBaSkList(isProcessed: boolean | undefined): Promise<BaSk[]>;
    getBaSkById(id: string): Promise<BaSk>;
    editBaSk(id: string, payload: NewBaSkPayload | undefined): Promise<BaSk>;
    deleteBaSkByAssesmentScheduleId(assesmentScheduleId: string): Promise<void>;
}

export default BaSkRepository;
