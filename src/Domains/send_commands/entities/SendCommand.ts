import { SendCommandPayload } from '../../../Commons/types';
import SystemMiners from '../../system_miners/entities/SystemMiners';

class SendCommand {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public systemMiners: SystemMiners | null;

    constructor(payload: SendCommandPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.systemMiners = payload.systemMiners;
    }
}

export default SendCommand;
