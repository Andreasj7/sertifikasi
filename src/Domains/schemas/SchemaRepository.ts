/* istanbul ignore file */
import Schema from './entities/Schema';

interface SchemaRepository {
    verifySchemaExists(schemaName: string): Promise<void>;
    verifyAvailableSchema(id: string): Promise<void>;
    addSchema(schemaName: string): Promise<Schema>;
    getSchema(): Promise<Schema[]>;
    getSchemaById(id: string): Promise<Schema>;
    editSchema(id: string, schemaName: string | undefined): Promise<Schema>;
    deleteSchema(id: string): Promise<void>;
}

export default SchemaRepository;
