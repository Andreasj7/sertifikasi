import { PrintBlankPayload } from '../../../Commons/types';
import PrintAssesion from '../../print_assesions/entities/PrintAssesion';

class PrintBlank {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public printAssesion?: PrintAssesion | null;

    constructor(payload: PrintBlankPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.printAssesion = payload.printAssesion;
    }
}

export default PrintBlank;
