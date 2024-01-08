import { inject, injectable } from 'inversify';
import DirecturSignRepository from '../../../Domains/directur_signs/DirecturSignRepository';
import DirecturSign from '../../../Domains/directur_signs/entities/DirecturSign';
import DirecturSignRepositoryMySql from '../../../Infrastructures/repository/DirecturSignRepositoryMySql';

@injectable()
class GetDirecturSignsUseCase {
    constructor(
        @inject(DirecturSignRepositoryMySql)
        private readonly printCompensationRepository: DirecturSignRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<DirecturSign[]> {
        return await this.printCompensationRepository.getDirecturSigns(
            isProcessed
        );
    }
}

export default GetDirecturSignsUseCase;
