import { inject, injectable } from 'inversify';
import PackingRepository from '../../../Domains/packings/PackingRepository';
import Packing from '../../../Domains/packings/entities/Packing';
import PackingRepositoryMySql from '../../../Infrastructures/repository/PackingRepositoryMySql';

@injectable()
class GetPackingsUseCase {
    constructor(
        @inject(PackingRepositoryMySql)
        private readonly packingRepository: PackingRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<Packing[]> {
        return await this.packingRepository.getPackings(isProcessed);
    }
}

export default GetPackingsUseCase;
