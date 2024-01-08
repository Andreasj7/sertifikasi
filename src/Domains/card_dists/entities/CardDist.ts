import { CardDistPayload } from '../../../Commons/types';
import Packing from '../../packings/entities/Packing';

class CardDist {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public packing: Packing | null;

    constructor(payload: CardDistPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.packing = payload.packing;
    }
}

export default CardDist;
