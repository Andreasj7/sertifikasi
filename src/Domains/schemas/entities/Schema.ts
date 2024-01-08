import { SchemaPayload } from '../../../Commons/types';

class Schema {
    public id: string;
    public schema: string;

    constructor(payload: SchemaPayload) {
        this.id = payload.id;
        this.schema = payload.schema;
    }
}

export default Schema;
