import CardDist from './entities/CardDist';

interface CardDistRepository {
    verifyAvailableCardDist(id: string): Promise<void>;
    addCardDist(packingId: string): Promise<CardDist>;
    getCardDists(isProcessed: boolean | undefined): Promise<CardDist[]>;
    getCardDistById(id: string): Promise<CardDist>;
    editCardDist(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<CardDist>;
    deleteCardDistByPackingId(packingId: string): Promise<void>;
}

export default CardDistRepository;
