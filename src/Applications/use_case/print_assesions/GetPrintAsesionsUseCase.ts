import { inject, injectable } from 'inversify';
import PrintAssesionRepository from '../../../Domains/print_assesions/PrintAssesionRepository';
import PrintAssesion from '../../../Domains/print_assesions/entities/PrintAssesion';
import PrintAssesionRepositoryMySql from '../../../Infrastructures/repository/PrintAssesionRepositoryMySql';

@injectable()
class GetPrintAssesionsUseCase {
    constructor(
        @inject(PrintAssesionRepositoryMySql)
        private readonly printAssesionRepository: PrintAssesionRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<PrintAssesion[]> {
        return await this.printAssesionRepository.getPrintAssesions(
            isProcessed
        );
    }
}

export default GetPrintAssesionsUseCase;
