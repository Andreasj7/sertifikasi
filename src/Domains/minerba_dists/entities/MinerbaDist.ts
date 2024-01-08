import { MinerbaDistPayload } from '../../../Commons/types';
import MinerbaData from '../../minerba_datas/entities/MinerbaData';

class MinerbaDist {
    public id: string;
    public no: string | null;
    public date: string | null;
    public isProcessed: boolean;
    public minerbaData?: MinerbaData | null;

    constructor(payload: MinerbaDistPayload) {
        this.id = payload.id;
        this.no = payload.no;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.minerbaData = payload.minerbaData;
    }
}

export default MinerbaDist;
