import { TukConfirmationPayload } from '../../../Commons/types';
import Receipt from '../../receipts/entities/Receipt';

class TukConfirmation {
    public id: string;
    public date: string | null;
    public description: string | null;
    public isProcessed: boolean;
    public receipt: Receipt | null;

    constructor(payload: TukConfirmationPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.description = payload.description;
        this.isProcessed = payload.isProcessed;
        this.receipt = payload.receipt;
    }
}

export default TukConfirmation;
