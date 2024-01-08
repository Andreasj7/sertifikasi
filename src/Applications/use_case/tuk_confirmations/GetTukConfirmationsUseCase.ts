import { inject, injectable } from 'inversify';
import TukConfirmationRepository from '../../../Domains/tuk_confirmations/TukConfirmationRepository';
import TukConfirmation from '../../../Domains/tuk_confirmations/entities/TukConfirmation';
import TukConfirmationRepositoryMySql from '../../../Infrastructures/repository/TukConfirmationRepositoryMySql';

@injectable()
class GetTukConfirmationsUseCase {
    constructor(
        @inject(TukConfirmationRepositoryMySql)
        private readonly tukConfirmationRepository: TukConfirmationRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<TukConfirmation[]> {
        return await this.tukConfirmationRepository.getTukConfirmations(
            isProcessed
        );
    }
}

export default GetTukConfirmationsUseCase;
