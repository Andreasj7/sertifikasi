/* istanbul ignore file */
import SptAssesor from './enitties/SptAssesor';

interface SptAssesorRepository {
    verifySptAssesorAvailable(id: string): Promise<void>;
    getSptAssesors(isProcessed: boolean | undefined): Promise<SptAssesor[]>;
    getSptAssesorById(id: string): Promise<SptAssesor>;
    addSptAssesor(certApplicatonId: string): Promise<SptAssesor>;
    editSptAssesor(
        id: string,
        noSptAssesor: string | undefined,
        assesorDate: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<SptAssesor>;
    deleteSptAssesorByCertApplicatonId(certApplicatonId: string): Promise<void>;
}

export default SptAssesorRepository;
