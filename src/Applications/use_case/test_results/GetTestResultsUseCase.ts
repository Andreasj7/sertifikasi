import { inject, injectable } from 'inversify';
import TestResultRepository from '../../../Domains/test_results/TestResultRepository';
import TestResult from '../../../Domains/test_results/entities/TestResult';
import TestResultRepositoryyMySql from '../../../Infrastructures/repository/TestResultRepositoryyMySql';

@injectable()
class GetTestResultsUseCase {
    constructor(
        @inject(TestResultRepositoryyMySql)
        private readonly testResultRepository: TestResultRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<TestResult[]> {
        return await this.testResultRepository.getTestResults(isProcessed);
    }
}

export default GetTestResultsUseCase;
