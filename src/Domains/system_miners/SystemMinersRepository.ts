import SystemMiners from './entities/SystemMiners';

interface SystemMinersRepository {
    verifyAvailableSystemMiners(id: string): Promise<void>;
    addSystemMiners(printBlankId: string): Promise<SystemMiners>;
    getSystemMinerss(isProcessed: boolean | undefined): Promise<SystemMiners[]>;
    getSystemMinersById(id: string): Promise<SystemMiners>;
    editSystemMiners(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<SystemMiners>;
    deleteSystemMinersByPrintBlankId(printBlankId: string): Promise<void>;
}

export default SystemMinersRepository;
