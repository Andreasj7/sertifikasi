import { inject, injectable } from 'inversify';
import CardDistRepository from '../../../Domains/card_dists/CardDistRepository';
import CardDist from '../../../Domains/card_dists/entities/CardDist';
import CardDistRepositoryMySql from '../../../Infrastructures/repository/CardDistRepositoryMySql';

@injectable()
class GetCardDistsUseCase {
    constructor(
        @inject(CardDistRepositoryMySql)
        private readonly cardDistRepository: CardDistRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<CardDist[]> {
        return await this.cardDistRepository.getCardDists(isProcessed);
    }
}

export default GetCardDistsUseCase;
