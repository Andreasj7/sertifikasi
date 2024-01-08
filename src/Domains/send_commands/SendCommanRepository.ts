import SendCommand from './entities/SendCommand';

interface SendCommandRepository {
    verifyAvailableSendCommand(id: string): Promise<void>;
    addSendCommand(systemMinersId: string): Promise<SendCommand>;
    getSendCommands(isProcessed: boolean | undefined): Promise<SendCommand[]>;
    getSendCommandById(id: string): Promise<SendCommand>;
    editSendCommand(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<SendCommand>;
    deleteSendCommandBySystemMinersId(systemMinersId: string): Promise<void>;
}

export default SendCommandRepository;
