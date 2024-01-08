import { inject, injectable } from 'inversify';
import PackingRepository from '../../../Domains/packings/PackingRepository';
import SendCommandRepository from '../../../Domains/send_commands/SendCommanRepository';
import SendCommand from '../../../Domains/send_commands/entities/SendCommand';
import PackingRepositoryMySql from '../../../Infrastructures/repository/PackingRepositoryMySql';
import SendCommandRepositoryMySql from '../../../Infrastructures/repository/SendCommandRepositoryMySql';

@injectable()
class EditSendCommandUseCase {
    constructor(
        @inject(SendCommandRepositoryMySql)
        private readonly sendCommandRepository: SendCommandRepository,
        @inject(PackingRepositoryMySql)
        private readonly packingRepository: PackingRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<SendCommand> {
        await this.sendCommandRepository.verifyAvailableSendCommand(id);
        const result = await this.sendCommandRepository.editSendCommand(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.packingRepository.addPacking(id);
        } else {
            await this.packingRepository.deletePackingBySendCommandId(id);
        }
        return result;
    }
}

export default EditSendCommandUseCase;
