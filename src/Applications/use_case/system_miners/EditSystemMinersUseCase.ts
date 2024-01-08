import { inject, injectable } from 'inversify';
import SendCommandRepository from '../../../Domains/send_commands/SendCommanRepository';
import SystemMinersRepository from '../../../Domains/system_miners/SystemMinersRepository';
import SystemMiners from '../../../Domains/system_miners/entities/SystemMiners';
import SendCommandRepositoryMySql from '../../../Infrastructures/repository/SendCommandRepositoryMySql';
import SystemMinersRepositoryMySql from '../../../Infrastructures/repository/SystemMinersRepositoryMySql';

@injectable()
class EditSystemMinersUseCase {
    constructor(
        @inject(SystemMinersRepositoryMySql)
        private readonly systemManersRepository: SystemMinersRepository,
        @inject(SendCommandRepositoryMySql)
        private readonly sendCommandRepository: SendCommandRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<SystemMiners> {
        await this.systemManersRepository.verifyAvailableSystemMiners(id);
        const result = await this.systemManersRepository.editSystemMiners(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.sendCommandRepository.addSendCommand(id);
        } else {
            await this.sendCommandRepository.deleteSendCommandBySystemMinersId(
                id
            );
        }
        return result;
    }
}

export default EditSystemMinersUseCase;
