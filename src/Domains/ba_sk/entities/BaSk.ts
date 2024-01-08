import { AssesmentSchedulePayload, BaSkPayload } from '../../../Commons/types';

class BaSk {
    public id: string;
    public noBaDate: string | null;
    public noSkDate: string | null;
    public plenoDate: string | null;
    public baDate: string | null;
    public skDate: string | null;
    public isProcessed: boolean;
    public assesmentSchedule: AssesmentSchedulePayload | null;

    constructor(payload: BaSkPayload) {
        this.id = payload.id;
        this.noBaDate = payload.noBaDate;
        this.noSkDate = payload.noSkDate;
        this.plenoDate = payload.plenoDate;
        this.baDate = payload.baDate;
        this.skDate = payload.skDate;
        this.isProcessed = payload.isProcessed;
        this.assesmentSchedule = payload.assesmentSchedule;
    }
}

export default BaSk;
