import { inject, injectable } from 'inversify';
import BaSkRepository from '../../../Domains/ba_sk/BaSkRepository';
import BaSk from '../../../Domains/ba_sk/entities/BaSk';
import BaSkRepositoryyMySql from '../../../Infrastructures/repository/BaSkRepositoryyMySql';

@injectable()
class GetBaSkListUseCase {
    constructor(
        @inject(BaSkRepositoryyMySql)
        private readonly baSkRepository: BaSkRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<BaSk[]> {
        return await this.baSkRepository.getBaSkList(isProcessed);
    }
}

export default GetBaSkListUseCase;
