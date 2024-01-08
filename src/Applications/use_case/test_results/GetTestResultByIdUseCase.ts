import { inject, injectable } from 'inversify';
import TestResultRepository from '../../../Domains/test_results/TestResultRepository';
import TestResult from '../../../Domains/test_results/entities/TestResult';
import TestResultRepositoryyMySql from '../../../Infrastructures/repository/TestResultRepositoryyMySql';

@injectable()
class GetTestResultByIdUseCase {
    constructor(
        @inject(TestResultRepositoryyMySql)
        private readonly testResultRepository: TestResultRepository
    ) {}

    async execute(id: string): Promise<TestResult> {
        return await this.testResultRepository.getTestResultById(id);
    }
}

export default GetTestResultByIdUseCase;
