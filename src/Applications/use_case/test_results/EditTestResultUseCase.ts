import { inject, injectable } from 'inversify';
import PrintAssesionRepository from '../../../Domains/print_assesions/PrintAssesionRepository';
import TestResultRepository from '../../../Domains/test_results/TestResultRepository';
import TestResult from '../../../Domains/test_results/entities/TestResult';
import PrintAssesionRepositoryMySql from '../../../Infrastructures/repository/PrintAssesionRepositoryMySql';
import TestResultRepositoryyMySql from '../../../Infrastructures/repository/TestResultRepositoryyMySql';

@injectable()
class EditTestResultUseCase {
    constructor(
        @inject(TestResultRepositoryyMySql)
        private readonly testResultRepository: TestResultRepository,
        @inject(PrintAssesionRepositoryMySql)
        private readonly printAssesionRepository: PrintAssesionRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<TestResult> {
        await this.testResultRepository.verifyAvailableTestResult(id);
        const result = await this.testResultRepository.editTestResult(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.printAssesionRepository.addPrintAssesion(id);
        } else {
            await this.printAssesionRepository.deletePrintAssesionByTestResultId(
                id
            );
        }
        return result;
    }
}

export default EditTestResultUseCase;
