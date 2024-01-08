import { inject, injectable } from 'inversify';
import CardDistRepository from '../../../Domains/card_dists/CardDistRepository';
import CardDist from '../../../Domains/card_dists/entities/CardDist';
import CardDistRepositoryMySql from '../../../Infrastructures/repository/CardDistRepositoryMySql';

@injectable()
class GetCardDistByIdUseCase {
    constructor(
        @inject(CardDistRepositoryMySql)
        private readonly cardDistRepository: CardDistRepository
    ) {}

    async execute(id: string): Promise<CardDist> {
        return await this.cardDistRepository.getCardDistById(id);
    }
}

export default GetCardDistByIdUseCase;
