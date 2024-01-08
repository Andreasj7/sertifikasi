import { inject, injectable } from 'inversify';
import MinerbaDataRepository from '../../../Domains/minerba_datas/MinerbaDataRepository';
import MinerbaData from '../../../Domains/minerba_datas/entities/MinerbaData';
import MinerbaDistRepository from '../../../Domains/minerba_dists/MinerbaDataRepository';
import MinerbaDataRepositoryMySql from '../../../Infrastructures/repository/MinerbaDataRepositoryMySql';
import MinerbaDistRepositoryMySql from '../../../Infrastructures/repository/MinerbaDistRepositoryMySql';

@injectable()
class EditMinerbaDataUseCase {
    constructor(
        @inject(MinerbaDataRepositoryMySql)
        private readonly minerbaDataRepository: MinerbaDataRepository,
        @inject(MinerbaDistRepositoryMySql)
        private readonly minerbaDistRepository: MinerbaDistRepository
    ) {}

    async execute(
        id: string,
        no: string | undefined,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<MinerbaData> {
        await this.minerbaDataRepository.verifyAvailableMinerbaData(id);
        const result = await this.minerbaDataRepository.editMinerbaData(
            id,
            no,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.minerbaDistRepository.addMinerbaDist(id);
        } else {
            await this.minerbaDistRepository.deleteMinerbaDistByMinerbaDataId(
                id
            );
        }
        return result;
    }
}

export default EditMinerbaDataUseCase;
