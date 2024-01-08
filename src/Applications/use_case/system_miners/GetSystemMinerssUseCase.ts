import { inject, injectable } from 'inversify';
import SystemMinersRepository from '../../../Domains/system_miners/SystemMinersRepository';
import SystemMiners from '../../../Domains/system_miners/entities/SystemMiners';
import SystemMinersRepositoryMySql from '../../../Infrastructures/repository/SystemMinersRepositoryMySql';

@injectable()
class GetSystemMinerssUseCase {
    constructor(
        @inject(SystemMinersRepositoryMySql)
        private readonly systemManersRepository: SystemMinersRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<SystemMiners[]> {
        return await this.systemManersRepository.getSystemMinerss(isProcessed);
    }
}

export default GetSystemMinerssUseCase;
