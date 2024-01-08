import { inject, injectable } from 'inversify';
import SchemaRepository from '../../../Domains/schemas/SchemaRepository';
import Schema from '../../../Domains/schemas/entities/Schema';
import SchemaRepositoryMySql from '../../../Infrastructures/repository/SchemaRepositoryMySql';

@injectable()
class GetSchemaByIdUseCase {
    constructor(
        @inject(SchemaRepositoryMySql)
        private readonly schemaRepository: SchemaRepository
    ) {}

    async execute(id: string): Promise<Schema> {
        return await this.schemaRepository.getSchemaById(id);
    }
}

export default GetSchemaByIdUseCase;
