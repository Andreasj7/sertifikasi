import { inject, injectable } from 'inversify';
import PrintBlankRepository from '../../../Domains/print_blanks/PrintBlankRepository';
import PrintBlank from '../../../Domains/print_blanks/entities/PrintBlank';
import PrintBlankRepositoryMySql from '../../../Infrastructures/repository/PrintBlankRepositoryMySql';

@injectable()
class GetPrintBlanksUseCase {
    constructor(
        @inject(PrintBlankRepositoryMySql)
        private readonly printAssesionRepository: PrintBlankRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<PrintBlank[]> {
        return await this.printAssesionRepository.getPrintBlanks(isProcessed);
    }
}

export default GetPrintBlanksUseCase;
