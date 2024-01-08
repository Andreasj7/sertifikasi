import { NewBlankApplicationPayload } from '../../Commons/types';
import BlankApplication from './entities/BlankApplication';

interface BlankApplicationRepository {
    verifyAvailableBlankApplication(id: string): Promise<void>;
    addBlankApplication(certApplicationId: string): Promise<BlankApplication>;
    getBlankApplications(
        isProcessed: boolean | undefined
    ): Promise<BlankApplication[]>;
    getBlankApplicationById(id: string): Promise<BlankApplication>;
    editBlankApplication(
        id: string,
        payload: NewBlankApplicationPayload | undefined
    ): Promise<BlankApplication>;
    deleteBlankApplicationBycertApplicationId(
        certApplicationId: string
    ): Promise<void>;
}

export default BlankApplicationRepository;
