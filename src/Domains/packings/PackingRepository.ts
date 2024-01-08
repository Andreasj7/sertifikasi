import Packing from './entities/Packing';

interface PackingRepository {
    verifyAvailablePacking(id: string): Promise<void>;
    addPacking(sendCommandId: string): Promise<Packing>;
    getPackings(isProcessed: boolean | undefined): Promise<Packing[]>;
    getPackingById(id: string): Promise<Packing>;
    editPacking(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<Packing>;
    deletePackingBySendCommandId(sendCommandId: string): Promise<void>;
}

export default PackingRepository;
