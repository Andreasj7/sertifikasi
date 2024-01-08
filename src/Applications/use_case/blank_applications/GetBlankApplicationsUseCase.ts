import { inject, injectable } from 'inversify';
import BlankApplicationRepository from '../../../Domains/blank_application/BlankApplicationRepository';
import BlankApplication from '../../../Domains/blank_application/entities/BlankApplication';
import BlankApplicationRepositoryMySql from '../../../Infrastructures/repository/BlankApplicationRepositoryMySql';

@injectable()
class GetBlankApplicationsUseCase {
    constructor(
        @inject(BlankApplicationRepositoryMySql)
        private readonly blankApplicationRepository: BlankApplicationRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<BlankApplication[]> {
        return await this.blankApplicationRepository.getBlankApplications(
            isProcessed
        );
    }
}

export default GetBlankApplicationsUseCase;
