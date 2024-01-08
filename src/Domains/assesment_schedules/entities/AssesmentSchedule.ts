import { AssesmentSchedulePayload } from '../../../Commons/types';
import Assesion from '../../assesions/entities/Assesions';

class AssesmentSchedule {
    public id: string;
    public schedule: string | null;
    public isProcessed: boolean;
    public assesion: Assesion | null;

    constructor(payload: AssesmentSchedulePayload) {
        this.id = payload.id;
        this.schedule = payload.schedule;
        this.isProcessed = payload.isProcessed;
        this.assesion = payload.assesion;
    }
}

export default AssesmentSchedule;
