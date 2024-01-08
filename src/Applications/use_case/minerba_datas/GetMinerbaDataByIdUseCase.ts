import { inject, injectable } from 'inversify';
import MinerbaDataRepository from '../../../Domains/minerba_datas/MinerbaDataRepository';
import MinerbaData from '../../../Domains/minerba_datas/entities/MinerbaData';
import MinerbaDataRepositoryMySql from '../../../Infrastructures/repository/MinerbaDataRepositoryMySql';

@injectable()
class GetMinerbaDataByIdUseCase {
    constructor(
        @inject(MinerbaDataRepositoryMySql)
        private readonly minerbaDataRepository: MinerbaDataRepository
    ) {}

    async execute(id: string): Promise<MinerbaData> {
        return await this.minerbaDataRepository.getMinerbaDataById(id);
    }
}

export default GetMinerbaDataByIdUseCase;
