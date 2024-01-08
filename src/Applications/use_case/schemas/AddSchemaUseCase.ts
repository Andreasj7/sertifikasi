import { inject, injectable } from 'inversify';
import SchemaRepository from '../../../Domains/schemas/SchemaRepository';
import Schema from '../../../Domains/schemas/entities/Schema';
import SchemaRepositoryMySql from '../../../Infrastructures/repository/SchemaRepositoryMySql';

@injectable()
class AddSchemaUseCase {
    constructor(
        @inject(SchemaRepositoryMySql)
        private readonly schemaRepository: SchemaRepository
    ) {}

    async execute(schemaName: string): Promise<Schema> {
        await this.schemaRepository.verifySchemaExists(schemaName);
        return await this.schemaRepository.addSchema(schemaName);
    }
}

export default AddSchemaUseCase;
