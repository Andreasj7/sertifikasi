import { SystemMinersPayload } from '../../../Commons/types';
import PrintBlank from '../../print_blanks/entities/PrintBlank';

class SystemMiners {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public printBlank?: PrintBlank | null;

    constructor(payload: SystemMinersPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.printBlank = payload.printBlank;
    }
}

export default SystemMiners;
