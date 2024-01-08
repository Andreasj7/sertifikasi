/* istanbul ignore file */
import AssesmentImpl from './entities/AssesmentImpl';

interface AssesmentImplRepository {
    verifyAvailableAssesmentImpl(id: string): Promise<void>;
    getAssesmentImpls(
        isProcessed: boolean | undefined
    ): Promise<AssesmentImpl[]>;
    getAssesmentImplById(id: string): Promise<AssesmentImpl>;
    addAssesmentImpl(sptAssesorId: string): Promise<AssesmentImpl>;
    editAssesmentImpl(
        id: string,
        isProcessed: boolean | undefined
    ): Promise<AssesmentImpl>;
    deleteAssesmentImplByAssesorId(sptAssesorId: string): Promise<void>;
}

export default AssesmentImplRepository;
