import { inject, injectable } from 'inversify';
import AssesionRepository from '../../../Domains/assesions/AssesionRepository';
import Assesion from '../../../Domains/assesions/entities/Assesions';
import AssesionRepositoryMySql from '../../../Infrastructures/repository/AssesionRepositoryMySql';

@injectable()
class GetAssesionByIdUseCase {
    constructor(
        @inject(AssesionRepositoryMySql)
        private readonly assesionRepository: AssesionRepository
    ) {}

    async execute(id: string): Promise<Assesion> {
        return await this.assesionRepository.getAssesionById(id);
    }
}

export default GetAssesionByIdUseCase;
