import { ApprovalPayload } from '../../../Commons/types';

class Approval {
    public id: string;
    public date: string | null = '-';
    public isApproved: boolean;

    constructor(payload: ApprovalPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isApproved = payload.isApproved;
    }
}

export default Approval;
