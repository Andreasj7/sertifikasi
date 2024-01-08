import { inject, injectable } from 'inversify';
import BaSkRepository from '../../../Domains/ba_sk/BaSkRepository';
import BaSk from '../../../Domains/ba_sk/entities/BaSk';
import BaSkRepositoryyMySql from '../../../Infrastructures/repository/BaSkRepositoryyMySql';

@injectable()
class GetBaSkByIdUseCase {
    constructor(
        @inject(BaSkRepositoryyMySql)
        private readonly baSkRepository: BaSkRepository
    ) {}

    async execute(id: string): Promise<BaSk> {
        return await this.baSkRepository.getBaSkById(id);
    }
}

export default GetBaSkByIdUseCase;
