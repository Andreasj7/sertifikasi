import { inject, injectable } from 'inversify';
import { BlankApplicationPayload } from '../../../Commons/types';
import BlankApplicationRepository from '../../../Domains/blank_application/BlankApplicationRepository';
import BlankApplication from '../../../Domains/blank_application/entities/BlankApplication';
import BlankApplicationRepositoryMySql from '../../../Infrastructures/repository/BlankApplicationRepositoryMySql';

@injectable()
class EditBlankApplicationUseCase {
    constructor(
        @inject(BlankApplicationRepositoryMySql)
        private readonly blankApplicationRepository: BlankApplicationRepository
    ) {}

    async execute(
        id: string,
        payload: BlankApplicationPayload | undefined = undefined
    ): Promise<BlankApplication> {
        await this.blankApplicationRepository.verifyAvailableBlankApplication(
            id
        );
        const result =
            await this.blankApplicationRepository.editBlankApplication(
                id,
                payload
            );
        return result;
    }
}

export default EditBlankApplicationUseCase;
