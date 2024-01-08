import { inject, injectable } from 'inversify';
import PrintAssesionRepository from '../../../Domains/print_assesions/PrintAssesionRepository';
import PrintAssesion from '../../../Domains/print_assesions/entities/PrintAssesion';
import PrintAssesionRepositoryMySql from '../../../Infrastructures/repository/PrintAssesionRepositoryMySql';

@injectable()
class GetPrintAssesionByIdUseCase {
    constructor(
        @inject(PrintAssesionRepositoryMySql)
        private readonly printAssesionRepository: PrintAssesionRepository
    ) {}

    async execute(id: string): Promise<PrintAssesion> {
        return await this.printAssesionRepository.getPrintAssesionById(id);
    }
}

export default GetPrintAssesionByIdUseCase;
