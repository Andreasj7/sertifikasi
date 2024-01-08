import { inject, injectable } from 'inversify';
import TukConfirmationRepository from '../../../Domains/tuk_confirmations/TukConfirmationRepository';
import TukConfirmation from '../../../Domains/tuk_confirmations/entities/TukConfirmation';
import TukConfirmationRepositoryMySql from '../../../Infrastructures/repository/TukConfirmationRepositoryMySql';

@injectable()
class EditTukConfirmationUseCase {
    constructor(
        @inject(TukConfirmationRepositoryMySql)
        private readonly tukConfirmationRepository: TukConfirmationRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        description: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<TukConfirmation> {
        await this.tukConfirmationRepository.verifyAvailableTukConfirmation(id);
        const result = await this.tukConfirmationRepository.editTukConfirmation(
            id,
            date,
            description,
            isProcessed
        );

        // if (result.isProcessed) {
        //     await this.directurSignRepository.addDirecturSign(id);
        // } else {
        //     await this.directurSignRepository.deleteDirecturSignByTukConfirmationId(
        //         id
        //     );
        // }
        return result;
    }
}

export default EditTukConfirmationUseCase;
