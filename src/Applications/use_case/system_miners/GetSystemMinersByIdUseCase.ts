import { inject, injectable } from 'inversify';
import SystemMinersRepository from '../../../Domains/system_miners/SystemMinersRepository';
import SystemMiners from '../../../Domains/system_miners/entities/SystemMiners';
import SystemMinersRepositoryMySql from '../../../Infrastructures/repository/SystemMinersRepositoryMySql';

@injectable()
class GetSystemMinersByIdUseCase {
    constructor(
        @inject(SystemMinersRepositoryMySql)
        private readonly systemManersRepository: SystemMinersRepository
    ) {}

    async execute(id: string): Promise<SystemMiners> {
        return await this.systemManersRepository.getSystemMinersById(id);
    }
}

export default GetSystemMinersByIdUseCase;
