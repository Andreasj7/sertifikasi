import { inject, injectable } from 'inversify';
import SchemaRepository from '../../../Domains/schemas/SchemaRepository';
import SchemaRepositoryMySql from '../../../Infrastructures/repository/SchemaRepositoryMySql';

@injectable()
class DeleteSchemaUseCase {
    constructor(
        @inject(SchemaRepositoryMySql)
        private readonly schemaRepository: SchemaRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.schemaRepository.verifyAvailableSchema(id);
        return await this.schemaRepository.deleteSchema(id);
    }
}

export default DeleteSchemaUseCase;
