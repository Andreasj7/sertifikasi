import { inject, injectable } from 'inversify';
import BlankApplicationRepository from '../../../Domains/blank_application/BlankApplicationRepository';
import BlankApplication from '../../../Domains/blank_application/entities/BlankApplication';
import BlankApplicationRepositoryMySql from '../../../Infrastructures/repository/BlankApplicationRepositoryMySql';

@injectable()
class GetBlankApplicationByIdUseCase {
    constructor(
        @inject(BlankApplicationRepositoryMySql)
        private readonly blankApplicationRepository: BlankApplicationRepository
    ) {}

    async execute(id: string): Promise<BlankApplication> {
        return await this.blankApplicationRepository.getBlankApplicationById(
            id
        );
    }
}

export default GetBlankApplicationByIdUseCase;
