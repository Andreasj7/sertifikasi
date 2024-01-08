import { inject, injectable } from 'inversify';
import MinerbaDistRepository from '../../../Domains/minerba_dists/MinerbaDataRepository';
import MinerbaDist from '../../../Domains/minerba_dists/entities/MinerbaDist';
import MinerbaDistRepositoryMySql from '../../../Infrastructures/repository/MinerbaDistRepositoryMySql';

@injectable()
class EditMinerbaDistUseCase {
    constructor(
        @inject(MinerbaDistRepositoryMySql)
        private readonly minerbaDataRepository: MinerbaDistRepository
    ) {}

    async execute(
        id: string,
        no: string | undefined,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<MinerbaDist> {
        await this.minerbaDataRepository.verifyAvailableMinerbaDist(id);
        const result = await this.minerbaDataRepository.editMinerbaDist(
            id,
            no,
            date,
            isProcessed
        );
        return result;
    }
}

export default EditMinerbaDistUseCase;
