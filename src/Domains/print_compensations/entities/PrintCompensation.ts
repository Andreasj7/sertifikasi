import { PrintCompensationPayload } from '../../../Commons/types';
import PrintBlank from '../../print_blanks/entities/PrintBlank';

class PrintCompensation {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public printBlank: PrintBlank | null;

    constructor(payload: PrintCompensationPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.printBlank = payload.printBlank;
    }
}

export default PrintCompensation;
