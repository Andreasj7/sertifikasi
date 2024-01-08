import { PackingPayload } from '../../../Commons/types';
import SendCommand from '../../send_commands/entities/SendCommand';

class Packing {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public sendCommand: SendCommand | null;

    constructor(payload: PackingPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.sendCommand = payload.sendCommand;
    }
}

export default Packing;
