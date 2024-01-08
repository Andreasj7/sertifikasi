/* istanbul ignore file */
import Approval from './entities/Approval';

interface ApprovalRepository {
    verifyAvailableApproval(id: string): Promise<void>;
    addApproval(isApproved: boolean): Promise<Approval>;
    editApproval(id: string, isApproved: boolean): Promise<Approval>;
    deleteApproval(id: string): Promise<void>;
}

export default ApprovalRepository;
