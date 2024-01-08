import { inject, injectable } from 'inversify';
import DirecturSignRepository from '../../../Domains/directur_signs/DirecturSignRepository';
import PrintCompensationRepository from '../../../Domains/print_compensations/PrintCompensationRepository';
import PrintCompensation from '../../../Domains/print_compensations/entities/PrintCompensation';
import DirecturSignRepositoryMySql from '../../../Infrastructures/repository/DirecturSignRepositoryMySql';
import PrintCompensationRepositoryMySql from '../../../Infrastructures/repository/PrintCompensationRepositoryMySql';

@injectable()
class EditPrintCompensationUseCase {
    constructor(
        @inject(PrintCompensationRepositoryMySql)
        private readonly printCompensationRepository: PrintCompensationRepository,
        @inject(DirecturSignRepositoryMySql)
        private readonly directurSignRepository: DirecturSignRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PrintCompensation> {
        await this.printCompensationRepository.verifyAvailablePrintCompensation(
            id
        );
        const result =
            await this.printCompensationRepository.editPrintCompensation(
                id,
                date,
                isProcessed
            );
        return result;
    }
}

export default EditPrintCompensationUseCase;
