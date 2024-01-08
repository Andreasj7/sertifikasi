import { inject, injectable } from 'inversify';
import AssesmentImplRepository from '../../../Domains/assesment_impl/AssmentImplRepository';
import AssesmentImpl from '../../../Domains/assesment_impl/entities/AssesmentImpl';
import AssesmentImplRepositoryMySql from '../../../Infrastructures/repository/AssesmentImplRepositoryMySql';

@injectable()
class GetAssesmentImplsUseCase {
    constructor(
        @inject(AssesmentImplRepositoryMySql)
        private readonly assesmentImplRepository: AssesmentImplRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<AssesmentImpl[]> {
        return await this.assesmentImplRepository.getAssesmentImpls(
            isProcessed
        );
    }
}

export default GetAssesmentImplsUseCase;
