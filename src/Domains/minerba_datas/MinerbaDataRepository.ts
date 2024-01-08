import MinerbaData from './entities/MinerbaData';

interface MinerbaDataRepository {
    verifyAvailableMinerbaData(id: string): Promise<void>;
    addMinerbaData(certApplicationId: string): Promise<MinerbaData>;
    getMinerbaDatas(isProcessed: boolean | undefined): Promise<MinerbaData[]>;
    getMinerbaDataById(id: string): Promise<MinerbaData>;
    editMinerbaData(
        id: string,
        no: string | undefined,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<MinerbaData>;
    deleteMinerbaDataByCertApplicationId(
        certApplicationId: string
    ): Promise<void>;
}

export default MinerbaDataRepository;
