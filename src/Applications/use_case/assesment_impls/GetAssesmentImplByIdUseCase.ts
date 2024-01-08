import { inject, injectable } from 'inversify';
import AssesmentImplRepository from '../../../Domains/assesment_impl/AssmentImplRepository';
import AssesmentImpl from '../../../Domains/assesment_impl/entities/AssesmentImpl';
import AssesmentImplRepositoryMySql from '../../../Infrastructures/repository/AssesmentImplRepositoryMySql';

@injectable()
class GetAssesmentImplByIdUseCase {
    constructor(
        @inject(AssesmentImplRepositoryMySql)
        private readonly assesmentImplRepository: AssesmentImplRepository
    ) {}

    async execute(id: string): Promise<AssesmentImpl> {
        await this.assesmentImplRepository.verifyAvailableAssesmentImpl(id);
        return await this.assesmentImplRepository.getAssesmentImplById(id);
    }
}

export default GetAssesmentImplByIdUseCase;
