import { inject, injectable } from 'inversify';
import SchemaRepository from '../../../Domains/schemas/SchemaRepository';
import Schema from '../../../Domains/schemas/entities/Schema';
import SchemaRepositoryMySql from '../../../Infrastructures/repository/SchemaRepositoryMySql';

@injectable()
class EditSchemaUseCase {
    constructor(
        @inject(SchemaRepositoryMySql)
        private readonly schemaRepository: SchemaRepository
    ) {}

    async execute(id: string, schemaName: string): Promise<Schema> {
        await this.schemaRepository.verifySchemaExists(schemaName);
        await this.schemaRepository.verifyAvailableSchema(id);
        return await this.schemaRepository.editSchema(id, schemaName);
    }
}

export default EditSchemaUseCase;
