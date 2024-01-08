import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import InvariantError from '../../Commons/exceptions/InvariantError';
import SchemaRepository from '../../Domains/schemas/SchemaRepository';
import Schema from '../../Domains/schemas/entities/Schema';

@injectable()
class SchemaRepositoryMySql implements SchemaRepository {
    constructor(
        @inject(PrismaClient) private readonly db: PrismaClient,
        @inject('IdGenerator') private readonly idGenerator: () => string
    ) {}

    async verifySchemaExists(schemaName: string): Promise<void> {
        const result = await this.db.schema.findFirst({
            where: { schema: schemaName },
        });

        if (result !== null) {
            throw new InvariantError('Skema telah ada');
        }
    }

    async verifyAvailableSchema(id: string): Promise<void> {
        const result = await this.db.schema.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Skema tidak ditemukan');
        }
    }

    async getSchema(): Promise<Schema[]> {
        const result = await this.db.schema.findMany();
        const schemas = result.map(
            (schema) =>
                new Schema({
                    id: schema.id,
                    schema: schema.schema,
                })
        );

        return schemas;
    }

    async getSchemaById(id: string): Promise<Schema> {
        const result = await this.db.schema.findFirst({
            where: { id },
        });

        if (result === null) {
            throw new InvariantError('Skema tidak ditemukan');
        }

        const payload = { id: result!.id, schema: result!.schema };
        return new Schema(payload);
    }

    async addSchema(schemaName: string): Promise<Schema> {
        const id = `schema-${this.idGenerator()}`;
        await this.db.schema.create({
            data: {
                id,
                schema: schemaName,
            },
        });
        return this.getSchemaById(id);
    }

    async editSchema(
        id: string,
        schemaName: string | undefined
    ): Promise<Schema> {
        await this.db.schema.update({
            where: { id: id },
            data: {
                schema: schemaName,
            },
        });
        return await this.getSchemaById(id);
    }

    async deleteSchema(id: string): Promise<void> {
        await this.db.schema.delete({
            where: { id: id },
        });
    }
}

export default SchemaRepositoryMySql;
