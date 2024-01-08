import { inject, injectable } from 'inversify';
import SptAssesorRepository from '../../../Domains/spt_assesors/SptAssesorRepository';
import SptAssesor from '../../../Domains/spt_assesors/enitties/SptAssesor';
import SptAssesorRepositoryMySql from '../../../Infrastructures/repository/SptAssesorRepositoryMySql';

@injectable()
class GetSptAssesorsUseCase {
    constructor(
        @inject(SptAssesorRepositoryMySql)
        private readonly sptAssesorRepository: SptAssesorRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<SptAssesor[]> {
        return await this.sptAssesorRepository.getSptAssesors(isProcessed);
    }
}

export default GetSptAssesorsUseCase;
