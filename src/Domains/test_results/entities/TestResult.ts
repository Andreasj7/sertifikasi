import { TestResultPayload } from '../../../Commons/types';
import BaSk from '../../ba_sk/entities/BaSk';

class TestResult {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public baSk: BaSk | null;

    constructor(payload: TestResultPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.baSk = payload.baSk;
    }
}

export default TestResult;
