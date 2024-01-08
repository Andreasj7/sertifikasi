import { inject, injectable } from 'inversify';
import PrintAssesionRepository from '../../../Domains/print_assesions/PrintAssesionRepository';
import PrintAssesion from '../../../Domains/print_assesions/entities/PrintAssesion';
import PrintBlankRepository from '../../../Domains/print_blanks/PrintBlankRepository';
import PrintAssesionRepositoryMySql from '../../../Infrastructures/repository/PrintAssesionRepositoryMySql';
import PrintBlankRepositoryMySql from '../../../Infrastructures/repository/PrintBlankRepositoryMySql';

@injectable()
class EditPrintAssesionUseCase {
    constructor(
        @inject(PrintAssesionRepositoryMySql)
        private readonly printAssesionRepository: PrintAssesionRepository,
        @inject(PrintBlankRepositoryMySql)
        private readonly printBlankRepository: PrintBlankRepository
    ) {}

    async execute(
        id: string,
        date: string | undefined,
        isProcessed: boolean | undefined
    ): Promise<PrintAssesion> {
        await this.printAssesionRepository.verifyAvailablePrintAssesion(id);
        const result = await this.printAssesionRepository.editPrintAssesion(
            id,
            date,
            isProcessed
        );

        if (result.isProcessed) {
            await this.printBlankRepository.addPrintBlank(id);
        } else {
            await this.printBlankRepository.deletePrintBlankByPrintAssesionId(
                id
            );
        }
        return result;
    }
}

export default EditPrintAssesionUseCase;
