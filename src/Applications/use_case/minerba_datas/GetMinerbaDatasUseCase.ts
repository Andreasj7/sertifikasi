import { inject, injectable } from 'inversify';
import MinerbaDataRepository from '../../../Domains/minerba_datas/MinerbaDataRepository';
import MinerbaData from '../../../Domains/minerba_datas/entities/MinerbaData';
import MinerbaDataRepositoryMySql from '../../../Infrastructures/repository/MinerbaDataRepositoryMySql';

@injectable()
class GetMinerbaDatasUseCase {
    constructor(
        @inject(MinerbaDataRepositoryMySql)
        private readonly minerbaDataRepository: MinerbaDataRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<MinerbaData[]> {
        return await this.minerbaDataRepository.getMinerbaDatas(isProcessed);
    }
}

export default GetMinerbaDatasUseCase;
