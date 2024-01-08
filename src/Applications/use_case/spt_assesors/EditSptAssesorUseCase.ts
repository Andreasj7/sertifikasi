import { inject, injectable } from 'inversify';
import AssesmentImplRepository from '../../../Domains/assesment_impl/AssmentImplRepository';
import SptAssesorRepository from '../../../Domains/spt_assesors/SptAssesorRepository';
import SptAssesor from '../../../Domains/spt_assesors/enitties/SptAssesor';
import AssesmentImplRepositoryMySql from '../../../Infrastructures/repository/AssesmentImplRepositoryMySql';
import SptAssesorRepositoryMySql from '../../../Infrastructures/repository/SptAssesorRepositoryMySql';

@injectable()
class EditSptAssesorUseCase {
    constructor(
        @inject(SptAssesorRepositoryMySql)
        private readonly sptAssesorRepository: SptAssesorRepository,
        @inject(AssesmentImplRepositoryMySql)
        private readonly assesmentImplRepository: AssesmentImplRepository
    ) {}

    async execute(
        id: string,
        noSptAssesor: string,
        assesorDate: string,
        isProcessed: boolean
    ): Promise<SptAssesor> {
        await this.sptAssesorRepository.verifySptAssesorAvailable(id);

        const result = await this.sptAssesorRepository.editSptAssesor(
            id,
            noSptAssesor,
            assesorDate,
            isProcessed
        );
        if (result.isProcessed) {
            await this.assesmentImplRepository.addAssesmentImpl(id);
        } else {
            await this.assesmentImplRepository.deleteAssesmentImplByAssesorId(
                id
            );
        }
        return result;
    }
}

export default EditSptAssesorUseCase;
