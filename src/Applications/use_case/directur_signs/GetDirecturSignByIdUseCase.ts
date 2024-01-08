import { inject, injectable } from 'inversify';
import DirecturSignRepository from '../../../Domains/directur_signs/DirecturSignRepository';
import DirecturSign from '../../../Domains/directur_signs/entities/DirecturSign';
import DirecturSignRepositoryMySql from '../../../Infrastructures/repository/DirecturSignRepositoryMySql';

@injectable()
class GetDirecturSignByIdUseCase {
    constructor(
        @inject(DirecturSignRepositoryMySql)
        private readonly printCompensationRepository: DirecturSignRepository
    ) {}

    async execute(id: string): Promise<DirecturSign> {
        return await this.printCompensationRepository.getDirecturSignById(id);
    }
}

export default GetDirecturSignByIdUseCase;
