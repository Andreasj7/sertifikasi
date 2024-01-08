import { inject, injectable } from 'inversify';
import PackingRepository from '../../../Domains/packings/PackingRepository';
import Packing from '../../../Domains/packings/entities/Packing';
import PackingRepositoryMySql from '../../../Infrastructures/repository/PackingRepositoryMySql';

@injectable()
class GetPackingByIdUseCase {
    constructor(
        @inject(PackingRepositoryMySql)
        private readonly packingRepository: PackingRepository
    ) {}

    async execute(id: string): Promise<Packing> {
        return await this.packingRepository.getPackingById(id);
    }
}

export default GetPackingByIdUseCase;
