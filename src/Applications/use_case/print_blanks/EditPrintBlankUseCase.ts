import { inject, injectable } from 'inversify';
import CertManagerRepository from '../../../Domains/cert_managers/CertManagerRepository';
import CertScannerRepository from '../../../Domains/cert_scanners/CertScannerRepository';
import CertStampRepository from '../../../Domains/cert_stamps/CertStampRepository';
import CertStorageRepository from '../../../Domains/cert_storages/CertStorageRepository';
import DirecturSignRepository from '../../../Domains/directur_signs/DirecturSignRepository';
import PrintBlankRepository from '../../../Domains/print_blanks/PrintBlankRepository';
import PrintBlank from '../../../Domains/print_blanks/entities/PrintBlank';
import PrintCompensationRepository from '../../../Domains/print_compensations/PrintCompensationRepository';
import SystemMinersRepository from '../../../Domains/system_miners/SystemMinersRepository';
import CertManagerRepositoryMySql from '../../../Infrastructures/repository/CertManagerRepositoryMySql';
import CertScannerRepositoryMySql from '../../../Infrastructures/repository/CertScannerRepositoryMySql';
import CertStampRepositoryMySql from '../../../Infrastructures/repository/CertStampRepositoryMySql';
import CertStorageRepositoryMySql from '../../../Infrastructures/repository/CertStorageRepositoryMySql';
import DirecturSignRepositoryMySql from '../../../Infrastructures/repository/DirecturSignRepositoryMySql';
import PrintBlankRepositoryMySql from '../../../Infrastructures/repository/PrintBlankRepositoryMySql';
import PrintCompensationRepositoryMySql from '../../../Infrastructures/repository/PrintCompensationRepositoryMySql';
import SystemMinersRepositoryMySql from '../../../Infrastructures/repository/SystemMinersRepositoryMySql';

@injectable()
class EditPrintBlankUseCase {
    constructor(
        @inject(PrintBlankRepositoryMySql)
        private readonly printBlankRepository: PrintBlankRepository,
        @inject(PrintCompensationRepositoryMySql)
        private readonly printCompensation: PrintCompensationRepository,
        @inject(DirecturSignRepositoryMySql)
        private readonly directurSignRepository: DirecturSignRepository,
        @inject(CertManagerRepositoryMySql)
        private readonly certManagerRepository: CertManagerRepository,
        @inject(CertStampRepositoryMySql)
        private readonly certStampRepository: CertStampRepository,
        @inject(CertScannerRepositoryMySql)
        private readonly certScannerRepository: CertScannerRepository,
        @inject(CertStorageRepositoryMySql)
        private readonly certStorageRepository: CertStorageRepository,
        @inject(SystemMinersRepositoryMySql)
        private readonly systemMinersRepository: SystemMinersRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PrintBlank> {
        await this.printBlankRepository.verifyAvailablePrintBlank(id);
        const result = await this.printBlankRepository.editPrintBlank(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.printCompensation.addPrintCompensation(id);
            await this.directurSignRepository.addDirecturSign(id);
            await this.certManagerRepository.addCertManager(id);
            await this.certStampRepository.addCertStamp(id);
            await this.certScannerRepository.addCertScanner(id);
            await this.certStorageRepository.addCertStorage(id);
            await this.systemMinersRepository.addSystemMiners(id);
        } else {
            await this.printCompensation.deletePrintCompensationByPrintBlankId(
                id
            );
            await this.directurSignRepository.deleteDirecturSignByPrintBlankId(
                id
            );
            await this.certManagerRepository.deleteCertManagerByPrintBlankId(
                id
            );
            await this.certStampRepository.deleteCertStampByPrintBlankId(id);
            await this.certScannerRepository.deleteCertScannerByPrintBlankId(
                id
            );
            await this.certStorageRepository.deleteCertStorageByPrintBlankId(
                id
            );
            await this.systemMinersRepository.deleteSystemMinersByPrintBlankId(
                id
            );
        }
        return result;
    }
}

export default EditPrintBlankUseCase;
