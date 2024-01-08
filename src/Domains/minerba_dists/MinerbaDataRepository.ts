import MinerbaDist from './entities/MinerbaDist';

interface MinerbaDistRepository {
    verifyAvailableMinerbaDist(id: string): Promise<void>;
    addMinerbaDist(minerbaDataId: string): Promise<MinerbaDist>;
    getMinerbaDists(isProcessed: boolean | undefined): Promise<MinerbaDist[]>;
    getMinerbaDistById(id: string): Promise<MinerbaDist>;
    editMinerbaDist(
        id: string,
        no: string | undefined,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<MinerbaDist>;
    deleteMinerbaDistByMinerbaDataId(minerbaDataId: string): Promise<void>;
}

export default MinerbaDistRepository;
