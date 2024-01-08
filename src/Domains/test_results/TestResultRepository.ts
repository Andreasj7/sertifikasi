import TestResult from './entities/TestResult';

interface TestResultRepository {
    verifyAvailableTestResult(id: string): Promise<void>;
    addTestResult(baSkId: string): Promise<TestResult>;
    getTestResults(isProcessed: boolean | undefined): Promise<TestResult[]>;
    getTestResultById(id: string): Promise<TestResult>;
    editTestResult(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<TestResult>;
    deleteTestResultByBaSkId(baSkId: string): Promise<void>;
}

export default TestResultRepository;
