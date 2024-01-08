import { inject, injectable } from 'inversify';
import SptAssesorRepository from '../../../Domains/spt_assesors/SptAssesorRepository';
import SptAssesor from '../../../Domains/spt_assesors/enitties/SptAssesor';
import SptAssesorRepositoryMySql from '../../../Infrastructures/repository/SptAssesorRepositoryMySql';

@injectable()
class GetSptAssesorByIdUseCase {
    constructor(
        @inject(SptAssesorRepositoryMySql)
        private readonly sptAssesorRepository: SptAssesorRepository
    ) {}

    async execute(id: string): Promise<SptAssesor> {
        return await this.sptAssesorRepository.getSptAssesorById(id);
    }
}

export default GetSptAssesorByIdUseCase;
