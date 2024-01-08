import { inject, injectable } from 'inversify';
import SendCommandRepository from '../../../Domains/send_commands/SendCommanRepository';
import SendCommand from '../../../Domains/send_commands/entities/SendCommand';
import SendCommandRepositoryMySql from '../../../Infrastructures/repository/SendCommandRepositoryMySql';

@injectable()
class GetSendCommandByIdUseCase {
    constructor(
        @inject(SendCommandRepositoryMySql)
        private readonly sendCommandRepository: SendCommandRepository
    ) {}

    async execute(id: string): Promise<SendCommand> {
        return await this.sendCommandRepository.getSendCommandById(id);
    }
}

export default GetSendCommandByIdUseCase;
