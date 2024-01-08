import { inject, injectable } from 'inversify';
import PrintBlankRepository from '../../../Domains/print_blanks/PrintBlankRepository';
import PrintBlank from '../../../Domains/print_blanks/entities/PrintBlank';
import PrintBlankRepositoryMySql from '../../../Infrastructures/repository/PrintBlankRepositoryMySql';

@injectable()
class GetPrintBlankByIdUseCase {
    constructor(
        @inject(PrintBlankRepositoryMySql)
        private readonly printAssesionRepository: PrintBlankRepository
    ) {}

    async execute(id: string): Promise<PrintBlank> {
        return await this.printAssesionRepository.getPrintBlankById(id);
    }
}

export default GetPrintBlankByIdUseCase;
