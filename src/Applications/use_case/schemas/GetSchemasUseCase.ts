import { inject, injectable } from 'inversify';
import SchemaRepository from '../../../Domains/schemas/SchemaRepository';
import Schema from '../../../Domains/schemas/entities/Schema';
import SchemaRepositoryMySql from '../../../Infrastructures/repository/SchemaRepositoryMySql';

@injectable()
class GetSchemaUseCase {
    constructor(
        @inject(SchemaRepositoryMySql)
        private readonly schemaRepository: SchemaRepository
    ) {}

    async execute(): Promise<Schema[]> {
        return await this.schemaRepository.getSchema();
    }
}

export default GetSchemaUseCase;
