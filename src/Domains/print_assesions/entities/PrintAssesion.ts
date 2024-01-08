import { PrintAssesionPayload } from '../../../Commons/types';
import TestResult from '../../test_results/entities/TestResult';

class PrintAssesion {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public assTestResult: TestResult | null;

    constructor(payload: PrintAssesionPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.assTestResult = payload.assTestResult;
    }
}

export default PrintAssesion;
