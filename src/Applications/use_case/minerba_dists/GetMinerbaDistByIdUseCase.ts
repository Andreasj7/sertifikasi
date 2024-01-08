import { inject, injectable } from 'inversify';
import MinerbaDistRepository from '../../../Domains/minerba_dists/MinerbaDataRepository';
import MinerbaDist from '../../../Domains/minerba_dists/entities/MinerbaDist';
import MinerbaDistRepositoryMySql from '../../../Infrastructures/repository/MinerbaDistRepositoryMySql';

@injectable()
class GetMinerbaDistByIdUseCase {
    constructor(
        @inject(MinerbaDistRepositoryMySql)
        private readonly minerbaDistRepository: MinerbaDistRepository
    ) {}

    async execute(id: string): Promise<MinerbaDist> {
        return await this.minerbaDistRepository.getMinerbaDistById(id);
    }
}

export default GetMinerbaDistByIdUseCase;
