import { inject, injectable } from 'inversify';
import CardDistRepository from '../../../Domains/card_dists/CardDistRepository';
import PackingRepository from '../../../Domains/packings/PackingRepository';
import Packing from '../../../Domains/packings/entities/Packing';
import CardDistRepositoryMySql from '../../../Infrastructures/repository/CardDistRepositoryMySql';
import PackingRepositoryMySql from '../../../Infrastructures/repository/PackingRepositoryMySql';

@injectable()
class EditPackingUseCase {
    constructor(
        @inject(PackingRepositoryMySql)
        private readonly packingRepository: PackingRepository,
        @inject(CardDistRepositoryMySql)
        private readonly cardDistRepository: CardDistRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<Packing> {
        await this.packingRepository.verifyAvailablePacking(id);
        const result = await this.packingRepository.editPacking(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.cardDistRepository.addCardDist(id);
        } else {
            await this.cardDistRepository.deleteCardDistByPackingId(id);
        }
        return result;
    }
}

export default EditPackingUseCase;
