import { inject, injectable } from 'inversify';
import { NewBaSkPayload } from '../../../Commons/types';
import BaSkRepository from '../../../Domains/ba_sk/BaSkRepository';
import BaSk from '../../../Domains/ba_sk/entities/BaSk';
import TestResultRepository from '../../../Domains/test_results/TestResultRepository';
import BaSkRepositoryyMySql from '../../../Infrastructures/repository/BaSkRepositoryyMySql';
import TestResultRepositoryMySql from '../../../Infrastructures/repository/TestResultRepositoryyMySql';

@injectable()
class EditBaSkUseCase {
    constructor(
        @inject(BaSkRepositoryyMySql)
        private readonly baSkRepository: BaSkRepository,
        @inject(TestResultRepositoryMySql)
        private readonly testResultRepository: TestResultRepository
    ) {}

    async execute(
        id: string,
        payload: NewBaSkPayload | undefined = undefined
    ): Promise<BaSk> {
        await this.baSkRepository.verifyAvailableBaSk(id);
        const result = await this.baSkRepository.editBaSk(id, payload);

        if (result.isProcessed) {
            try {
                await this.testResultRepository.addTestResult(id);
            } catch (error) {
                console.log(error);
            }
        } else {
            await this.testResultRepository.deleteTestResultByBaSkId(id);
        }
        return result;
    }
}

export default EditBaSkUseCase;
