import { inject, injectable } from 'inversify';
import MinerbaDistRepository from '../../../Domains/minerba_dists/MinerbaDataRepository';
import MinerbaDist from '../../../Domains/minerba_dists/entities/MinerbaDist';
import MinerbaDistRepositoryMySql from '../../../Infrastructures/repository/MinerbaDistRepositoryMySql';

@injectable()
class GetMinerbaDistsUseCase {
    constructor(
        @inject(MinerbaDistRepositoryMySql)
        private readonly minerbaDataRepository: MinerbaDistRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<MinerbaDist[]> {
        return await this.minerbaDataRepository.getMinerbaDists(isProcessed);
    }
}

export default GetMinerbaDistsUseCase;
