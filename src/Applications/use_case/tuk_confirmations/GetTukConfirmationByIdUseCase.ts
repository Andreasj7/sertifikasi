import { inject, injectable } from 'inversify';
import TukConfirmationRepository from '../../../Domains/tuk_confirmations/TukConfirmationRepository';
import TukConfirmation from '../../../Domains/tuk_confirmations/entities/TukConfirmation';
import TukConfirmationRepositoryMySql from '../../../Infrastructures/repository/TukConfirmationRepositoryMySql';

@injectable()
class GetTukConfirmationByIdUseCase {
    constructor(
        @inject(TukConfirmationRepositoryMySql)
        private readonly tukConfirmationRepository: TukConfirmationRepository
    ) {}

    async execute(id: string): Promise<TukConfirmation> {
        return await this.tukConfirmationRepository.getTukConfirmationById(id);
    }
}

export default GetTukConfirmationByIdUseCase;
