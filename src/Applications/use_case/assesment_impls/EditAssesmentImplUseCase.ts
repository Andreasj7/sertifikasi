import { inject, injectable } from 'inversify';
import { NewAssesmentImplPayload } from '../../../Commons/types';
import AssesionRepository from '../../../Domains/assesions/AssesionRepository';
import AssesmentImplRepository from '../../../Domains/assesment_impl/AssmentImplRepository';
import AssesmentImpl from '../../../Domains/assesment_impl/entities/AssesmentImpl';
import SchemaRepository from '../../../Domains/schemas/SchemaRepository';
import AssesionRepositoryMySql from '../../../Infrastructures/repository/AssesionRepositoryMySql';
import AssesmentImplRepositoryMySql from '../../../Infrastructures/repository/AssesmentImplRepositoryMySql';
import SchemaRepositoryMySql from '../../../Infrastructures/repository/SchemaRepositoryMySql';

@injectable()
class EditAssesmentImplUseCase {
    constructor(
        @inject(AssesmentImplRepositoryMySql)
        private readonly assesmentImplRepository: AssesmentImplRepository,
        @inject(SchemaRepositoryMySql)
        private readonly schemaRepository: SchemaRepository,
        @inject(AssesionRepositoryMySql)
        private readonly assesionRepository: AssesionRepository
    ) {}

    async execute(
        id: string,
        isProcessed: boolean | undefined = undefined,
        payload: NewAssesmentImplPayload
    ): Promise<AssesmentImpl> {
        await this.assesmentImplRepository.verifyAvailableAssesmentImpl(id);
        await this.schemaRepository.verifyAvailableSchema(payload.idSchema);
        const result = await this.assesmentImplRepository.editAssesmentImpl(
            id,
            isProcessed
        );

        if (result.isProcessed) {
            await this.assesionRepository.addAssesion(id, payload);
        } else {
            await this.assesionRepository.deleteAssesionByAssesmentImplId(id);
        }
        return result;
    }
}

export default EditAssesmentImplUseCase;
