import { inject, injectable } from 'inversify';
import PrintCompensationRepository from '../../../Domains/print_compensations/PrintCompensationRepository';
import PrintCompensation from '../../../Domains/print_compensations/entities/PrintCompensation';
import PrintCompensationRepositoryMySql from '../../../Infrastructures/repository/PrintCompensationRepositoryMySql';

@injectable()
class GetPrintCompensationsUseCase {
    constructor(
        @inject(PrintCompensationRepositoryMySql)
        private readonly printCompensationRepository: PrintCompensationRepository
    ) {}

    async execute(
        isProcessed: boolean | undefined = undefined
    ): Promise<PrintCompensation[]> {
        return await this.printCompensationRepository.getPrintCompensations(
            isProcessed
        );
    }
}

export default GetPrintCompensationsUseCase;
