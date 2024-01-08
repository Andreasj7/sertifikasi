import DirecturSign from './entities/DirecturSign';

interface DirecturSignRepository {
    verifyAvailableDirecturSign(id: string): Promise<void>;
    addDirecturSign(printBlankId: string): Promise<DirecturSign>;
    getDirecturSigns(isProcessed: boolean | undefined): Promise<DirecturSign[]>;
    getDirecturSignById(id: string): Promise<DirecturSign>;
    editDirecturSign(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<DirecturSign>;
    deleteDirecturSignByPrintBlankId(printBlankId: string): Promise<void>;
}

export default DirecturSignRepository;
