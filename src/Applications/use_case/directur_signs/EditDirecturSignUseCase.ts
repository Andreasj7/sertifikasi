import { inject, injectable } from 'inversify';
import DirecturSignRepository from '../../../Domains/directur_signs/DirecturSignRepository';
import DirecturSign from '../../../Domains/directur_signs/entities/DirecturSign';
import DirecturSignRepositoryMySql from '../../../Infrastructures/repository/DirecturSignRepositoryMySql';

@injectable()
class EditDirecturSignUseCase {
    constructor(
        @inject(DirecturSignRepositoryMySql)
        private readonly printCompensationRepository: DirecturSignRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<DirecturSign> {
        await this.printCompensationRepository.verifyAvailableDirecturSign(id);
        const result = await this.printCompensationRepository.editDirecturSign(
            id,
            date,
            isProcessed
        );
        return result;
    }
}

export default EditDirecturSignUseCase;
