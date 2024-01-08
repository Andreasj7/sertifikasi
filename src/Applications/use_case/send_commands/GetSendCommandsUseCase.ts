import { inject, injectable } from 'inversify';
import SendCommandRepository from '../../../Domains/send_commands/SendCommanRepository';
import SendCommand from '../../../Domains/send_commands/entities/SendCommand';
import SendCommandRepositoryMySql from '../../../Infrastructures/repository/SendCommandRepositoryMySql';

@injectable()
class GetSendCommandsUseCase {
    constructor(
        @inject(SendCommandRepositoryMySql)
        private readonly sendCommandRepository: SendCommandRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<SendCommand[]> {
        return await this.sendCommandRepository.getSendCommands(isProcessed);
    }
}

export default GetSendCommandsUseCase;
