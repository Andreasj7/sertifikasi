import { inject, injectable } from 'inversify';
import CardDistRepository from '../../../Domains/card_dists/CardDistRepository';
import CardDist from '../../../Domains/card_dists/entities/CardDist';
import CertDistRepository from '../../../Domains/cert_dists/CertDistRepository';
import CardDistRepositoryMySql from '../../../Infrastructures/repository/CardDistRepositoryMySql';
import CertDistRepositoryMySql from '../../../Infrastructures/repository/CertDistRepositoryMySql';

@injectable()
class EditCardDistUseCase {
    constructor(
        @inject(CardDistRepositoryMySql)
        private readonly cardDistRepository: CardDistRepository,
        @inject(CertDistRepositoryMySql)
        private readonly certDistRepository: CertDistRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CardDist> {
        await this.cardDistRepository.verifyAvailableCardDist(id);
        const result = await this.cardDistRepository.editCardDist(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.certDistRepository.addCertDist(id);
        } else {
            await this.certDistRepository.deleteCertDistByCardDistId(id);
        }
        return result;
    }
}

export default EditCardDistUseCase;
