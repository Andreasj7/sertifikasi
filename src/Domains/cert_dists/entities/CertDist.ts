import { CertDistPayload } from '../../../Commons/types';
import CardDist from '../../card_dists/entities/CardDist';

class CertDist {
    public id: string;
    public date: string | null;
    public isProcessed: boolean;
    public cardDist: CardDist | null;

    constructor(payload: CertDistPayload) {
        this.id = payload.id;
        this.date = payload.date;
        this.isProcessed = payload.isProcessed;
        this.cardDist = payload.cardDist;
    }
}

export default CertDist;
