import { inject, injectable } from 'inversify';
import AssesionRepository from '../../../Domains/assesions/AssesionRepository';
import Assesion from '../../../Domains/assesions/entities/Assesions';
import AssesionRepositoryMySql from '../../../Infrastructures/repository/AssesionRepositoryMySql';

@injectable()
class GetAssesionsUseCase {
    constructor(
        @inject(AssesionRepositoryMySql)
        private readonly assesionRepository: AssesionRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<Assesion[]> {
        return await this.assesionRepository.getAssesions(isProcessed);
    }
}

export default GetAssesionsUseCase;
